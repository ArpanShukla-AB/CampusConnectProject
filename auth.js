// JWT Authentication Module for CampusConnect

// Simple JWT implementation (In production, use a backend server)
class JWTAuth {
    constructor() {
        this.secretKey = 'campus-connect-secret-key-2024'; // In production, this should be on the backend
        this.users = this.loadUsers();
    }

    // Generate a simple JWT token
    generateToken(payload) {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const body = btoa(JSON.stringify({
            ...payload,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours expiry
        }));
        
        // Simple signature (not cryptographically secure - for demo purposes only)
        const signature = btoa(this.secretKey + header + body);
        
        return `${header}.${body}.${signature}`;
    }

    // Verify JWT token
    verifyToken(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;

            const payload = JSON.parse(atob(parts[1]));
            
            // Check expiration
            if (payload.exp < Math.floor(Date.now() / 1000)) {
                return null; // Token expired
            }

            return payload;
        } catch (error) {
            return null;
        }
    }

    // Load users from localStorage
    loadUsers() {
        const stored = localStorage.getItem('campusConnectUsers');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Initialize with some demo users
        return [
            {
                id: 'user1',
                email: 'student@example.com',
                password: 'password123', // In production, this would be hashed on backend
                name: 'John Student',
                college: 'RV College',
                avatar: '👨‍🎓'
            },
            {
                id: 'user2',
                email: 'mentor@example.com',
                password: 'password123',
                name: 'Dr. Smith',
                college: 'MIT',
                avatar: '👨‍🏫'
            }
        ];
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('campusConnectUsers', JSON.stringify(this.users));
    }

    // Register a new user
    registerUser(email, password, name, college) {
        // Check if user already exists
        if (this.users.some(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = {
            id: 'user' + Date.now(),
            email,
            password, // In production, hash this password
            name,
            college,
            avatar: '👨‍🎓'
        };

        this.users.push(newUser);
        this.saveUsers();

        return {
            success: true,
            message: 'User registered successfully',
            user: { id: newUser.id, email: newUser.email, name: newUser.name, college: newUser.college }
        };
    }

    // Login user
    loginUser(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Generate JWT token
        const token = this.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            college: user.college
        });

        return {
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                college: user.college,
                avatar: user.avatar
            }
        };
    }

    // Get current user from token
    getCurrentUser(token) {
        const payload = this.verifyToken(token);
        if (!payload) return null;

        const user = this.users.find(u => u.id === payload.id);
        if (!user) return null;

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            college: user.college,
            avatar: user.avatar
        };
    }

    // Logout user
    logoutUser() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }
}

// Initialize JWT Auth
const jwtAuth = new JWTAuth();

// Global authentication functions
async function authenticateUser(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = jwtAuth.loginUser(email, password);
            resolve(result);
        }, 500); // Simulate network delay
    });
}

async function registerUserAccount(email, password, name, college) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = jwtAuth.registerUser(email, password, name, college);
            resolve(result);
        }, 500);
    });
}

function getCurrentAuthUser() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    return jwtAuth.getCurrentUser(token);
}

function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    return jwtAuth.verifyToken(token) !== null;
}

function logoutUser() {
    jwtAuth.logoutUser();
    window.location.href = 'login.html';
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Demo accounts for easy testing
console.log('Demo Accounts:');
console.log('Email: student@example.com, Password: password123');
console.log('Email: mentor@example.com, Password: password123');
