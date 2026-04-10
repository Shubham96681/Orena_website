/**
 * Moodle Web Service integration
 * Uses the Vite dev proxy (/moodle-api) in development to avoid CORS.
 * In production (same domain), requests go directly to the Moodle REST endpoint.
 */

const WSTOKEN = import.meta.env.VITE_MOODLE_WSTOKEN || '';
const MOODLE_BASE = import.meta.env.VITE_MOODLE_BASE_URL || 'https://orena.solutions/moodle';

// In dev (localhost) use the Vite proxy; in production call Moodle directly
const isDev = import.meta.env.DEV;
const API_ENDPOINT = isDev ? '/moodle-api' : `${MOODLE_BASE}/webservice/rest/server.php`;

/** Low-level helper: call any Moodle web service function */
async function moodleCall(wsfunction, extraParams = {}) {
    const params = new URLSearchParams({
        wstoken: WSTOKEN,
        wsfunction,
        moodlewsrestformat: 'json',
        ...extraParams,
    });
    const res = await fetch(`${API_ENDPOINT}?${params.toString()}`);
    if (!res.ok) throw new Error(`Moodle API HTTP error ${res.status}`);
    const data = await res.json();
    if (data && data.exception) throw new Error(`Moodle: ${data.message} (${data.errorcode})`);
    return data;
}

/** Strip HTML tags from Moodle summary */
function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Assign a category and icon based on course name keywords.
 * Since the API may not expose categories, we derive them from the course title.
 */
function categorizeCourse(fullname = '') {
    const n = fullname.toLowerCase();

    if (n.includes('python')) return { category: 'Programming', icon: '🐍' };
    if (n.includes('java') && !n.includes('javascript')) return { category: 'Programming', icon: '☕' };
    if (n.includes('javascript') || n.includes('js')) return { category: 'Web Dev', icon: '🟨' };
    if (n.includes('fullstack') || n.includes('full stack') || n.includes('full-stack')) return { category: 'Web Dev', icon: '🌐' };
    if (n.includes('cyber') || n.includes('security')) return { category: 'Cybersecurity', icon: '🛡️' };
    if (n.includes('vlsi')) return { category: 'Electronics', icon: '🔬' };
    if (n.includes('embedded') || n.includes('iot')) return { category: 'Electronics', icon: '🤖' };
    if (n.includes('cloud') || n.includes('aws') || n.includes('devops')) return { category: 'Cloud & DevOps', icon: '☁️' };
    if (n.includes('data') || n.includes('ai') || n.includes('ml') || n.includes('machine learning')) return { category: 'Data & AI', icon: '🧠' };
    if (n.includes('ui') || n.includes('ux') || n.includes('design')) return { category: 'Design', icon: '🎨' };
    if (n.includes('it fresher') || n.includes('entc') || n.includes('electronic')) return { category: 'Electronics', icon: '⚡' };
    return { category: 'Technology', icon: '💻' };
}

/** Pick a themed background image from Unsplash based on category */
function getCourseImage(category, id) {
    const imageMap = {
        'Programming':   'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
        'Web Dev':       'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        'Cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        'Electronics':   'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        'Cloud & DevOps':'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
        'Data & AI':     'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        'Design':        'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
        'Technology':    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    };
    return imageMap[category] || imageMap['Technology'];
}

/** Map level/difficulty guess based on course name */
function guessLevel(fullname = '') {
    const n = fullname.toLowerCase();
    if (n.includes('advanced') || n.includes('pro') || n.includes('expert') || n.includes('architect')) return 'Advanced';
    if (n.includes('intermediate') || n.includes('mid')) return 'Intermediate';
    return 'Beginner';
}

/**
 * Decide whether a course is a "public" course worth showing.
 * Filters out internal batch quizzes, test runs, and admin helper courses.
 */
function isPublicCourse(course) {
    if (course.visible === 0) return false; // hidden in Moodle
    if (course.id === 1) return false;       // site home

    const n = (course.fullname || '').toLowerCase();
    const s = (course.shortname || '').toLowerCase();

    // Exclude batch/quiz/test/admin courses
    const SKIP_KEYWORDS = [
        'quiz', 'questionar', 'test-l', 'questionaire',
        'batch1', 'batch2', 'batch3', 'batch4', 'batch5',
        'cbit', 'gnits', 'jbiet', 'pallavi', 'mruh', 'sreyas',
        'icfai', 'avniet', 'hitam', 'cug', 'cgу',
        'example', 'examp', 'exp', 'copying', 'x_hire', 'opencats',
    ];
    for (const kw of SKIP_KEYWORDS) {
        if (n.includes(kw) || s.includes(kw)) return false;
    }
    return true;
}

/**
 * Fetch all visible Moodle courses and normalise them for display.
 * Filters to only "public-facing" courses.
 */
export async function fetchMoodleCourses() {
    const raw = await moodleCall('core_course_get_courses');
    const allCourses = Array.isArray(raw) ? raw : [];

    return allCourses
        .filter(isPublicCourse)
        .map(c => {
            const { category, icon } = categorizeCourse(c.fullname);
            return {
                id: c.id,
                title: c.fullname || c.shortname,
                shortName: c.shortname,
                summary: stripHtml(c.summary) || `Explore ${c.fullname} — an expert-led course on our Moodle platform.`,
                categoryName: category,
                icon,
                image: getCourseImage(category, c.id),
                level: guessLevel(c.fullname),
                format: c.format || 'topics',
                url: `${MOODLE_BASE}/course/view.php?id=${c.id}`,
                enrollUrl: `${MOODLE_BASE}/enrol/index.php?id=${c.id}`,
                startDate: c.startdate ? new Date(c.startdate * 1000) : null,
                numsections: c.numsections || 0,
            };
        });
}

export const MOODLE_LOGIN_URL = `https://orena.solutions/moodle/login/index.php`;
export const MOODLE_HOME_URL = `https://orena.solutions/moodle/login/index.php`;

export default { fetchMoodleCourses };
