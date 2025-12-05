// Hash-based router (works with file:// protocol)

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });
        window.addEventListener('load', () => {
            this.handleRoute();
        });
        this.handleRoute();
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path) {
        if (path.startsWith('/')) {
            path = path.substring(1);
        }
        window.location.hash = '#' + path;
        this.handleRoute();
    }

    getHashPath() {
        const hash = window.location.hash.substring(1);
        return hash || '/';
    }

    handleRoute() {
        const hashPath = this.getHashPath();
        const pathParts = hashPath.split('/').filter(p => p);

        if (pathParts.length === 0 || (pathParts.length === 1 && pathParts[0] === '')) {
            // Home page
            if (this.routes['/']) {
                this.routes['/']();
            }
        } else if (pathParts[0] === 'learn' && pathParts[1]) {
            // Course page
            const courseName = pathParts[1];
            if (this.routes['/learn/:courseName']) {
                this.routes['/learn/:courseName'](courseName);
            }
        } else if (pathParts[0] === 'mentors') {
            // Mentors page
            if (pathParts[1]) {
                // Mentor profile
                const mentorId = pathParts[1];
                if (this.routes['/mentors/:id']) {
                    this.routes['/mentors/:id'](mentorId);
                }
            } else {
                // All mentors
                if (this.routes['/mentors']) {
                    this.routes['/mentors']();
                }
            }
        } else if (pathParts[0] === 'blogs' && pathParts[1]) {
            // Blog page
            const username = pathParts[1];
            const blogId = pathParts[2]; // For individual blog posts
            if (blogId && this.routes['/blogs/:username/:id']) {
                this.routes['/blogs/:username/:id'](username, blogId);
            } else if (this.routes['/blogs/:username']) {
                this.routes['/blogs/:username'](username);
            }
        } else if (pathParts[0] === 'leaderboard') {
            // Leaderboard page
            if (this.routes['/leaderboard']) {
                this.routes['/leaderboard']();
            }
        } else {
            // 404 - redirect to home
            if (this.routes['/']) {
                this.routes['/']();
            }
        }
    }
}

const router = new Router();
