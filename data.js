const courses = [
    { id: 'c', name: 'C', description: 'Learn the fundamentals of C programming language' },
    { id: 'cpp', name: 'C++', description: 'Master object-oriented programming with C++' },
    { id: 'java', name: 'Java', description: 'Build robust applications with Java' },
    { id: 'javascript', name: 'JavaScript', description: 'Create interactive web applications' },
    { id: 'webdev', name: 'Web Development', description: 'Full-stack web development course' }
];

const mentors = [
    {
        id: 'mentor1',
        name: 'Arpan Shukla',
        photo: 'https://ui-avatars.com/api/?name=Arpan+Shukla&background=667eea&color=fff&size=200',
        skills: ['C', 'C++', 'Data Structures'],
        bio: 'Expert in systems programming with 15+ years of experience. PhD in Computer Science.',
        projectCount: 12,
        rating: 4.9,
        projects: [
            { id: 'p1', title: 'Memory Management System', description: 'Advanced memory allocation algorithms', link: 'https://github.com/example', image: 'https://via.placeholder.com/400x300?text=Memory+Management' },
            { id: 'p2', title: 'Compiler Design', description: 'Building a simple C compiler', link: 'https://github.com/example', image: 'https://via.placeholder.com/400x300?text=Compiler' }
        ],
        blogs: [
            { id: 'b1', title: 'Understanding Pointers in C', content: 'Pointers are one of the most powerful features of C...', date: '2024-01-15' },
            { id: 'b2', title: 'Optimizing C++ Performance', content: 'Learn how to write efficient C++ code...', date: '2024-01-10' }
        ]
    },
    {
        id: 'mentor2',
        name: 'Krish Gupta',
        photo: 'https://ui-avatars.com/api/?name=Krish+Gupta&background=764ba2&color=fff&size=200',
        skills: ['Java', 'Spring Boot', 'Microservices'],
        bio: 'Enterprise Java specialist with expertise in building scalable applications.',
        projectCount: 18,
        rating: 4.8,
        projects: [
            { id: 'p3', title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution', link: 'https://github.com/example', image: 'https://via.placeholder.com/400x300?text=E-Commerce' },
            { id: 'p4', title: 'REST API Framework', description: 'Building RESTful APIs with Spring', link: 'https://github.com/example', image: 'https://via.placeholder.com/400x300?text=REST+API' }
        ],
        blogs: [
            { id: 'b3', title: 'Java Best Practices', content: 'Essential practices for Java developers...', date: '2024-01-12' }
        ]
    },
    {
        id: 'mentor3',
        name: 'Harsh Raj',
        photo: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=f59e0b&color=fff&size=200',
        skills: ['JavaScript', 'React', 'Node.js'],
        bio: 'Full-stack JavaScript developer passionate about modern web technologies.',
        projectCount: 25,
        rating: 4.95,
        projects: [
            { id: 'p5', title: 'Social Media App', description: 'Real-time social networking platform', link: 'https://github.com/example', image: 'https://via.placeholder.com/400x300?text=Social+App' },
            { id: 'p6', title: 'Task Management System', description: 'Collaborative task management tool', link: 'https://github.com/example', image: 'https://via.placeholder.com/400x300?text=Task+Manager' }
        ],
        blogs: [
            { id: 'b4', title: 'React Hooks Explained', content: 'A comprehensive guide to React Hooks...', date: '2024-01-18' },
            { id: 'b5', title: 'Node.js Performance Tips', content: 'Optimizing Node.js applications...', date: '2024-01-14' }
        ]
    },
    {
        id: 'mentor4',
        name: 'Abishek',
        photo: 'https://ui-avatars.com/api/?name=David+Kim&background=10b981&color=fff&size=200',
        skills: ['Web Development', 'HTML/CSS', 'Vue.js'],
        bio: 'Frontend specialist with a focus on user experience and modern design.',
        projectCount: 20,
        rating: 4.7,
        projects: [
            { id: 'p7', title: 'Portfolio Website', description: 'Modern responsive portfolio design', link: 'https://github.com/example', image: 'https://via.placeholder.com/400x300?text=Portfolio' },
            { id: 'p8', title: 'E-Learning Platform', description: 'Interactive learning management system', link: 'https://github.com/example', image: 'https://via.placeholder.com/400x300?text=E-Learning' }
        ],
        blogs: [
            { id: 'b6', title: 'CSS Grid Mastery', content: 'Master CSS Grid layout...', date: '2024-01-16' }
        ]
    }
];

const courseMentors = {
    'c': [mentors[0]],
    'cpp': [mentors[0]],
    'java': [mentors[1]],
    'javascript': [mentors[2]],
    'webdev': [mentors[2], mentors[3]]
};

const courseProjects = {
    'c': [
        { id: 'cp1', title: 'File System Manager', description: 'C implementation of file operations', mentor: mentors[0].name },
        { id: 'cp2', title: 'Network Socket Programming', description: 'Building network applications in C', mentor: mentors[0].name }
    ],
    'cpp': [
        { id: 'cpp1', title: 'Game Engine', description: '2D game engine using C++', mentor: mentors[0].name },
        { id: 'cpp2', title: 'Image Processing Library', description: 'Advanced image manipulation', mentor: mentors[0].name }
    ],
    'java': [
        { id: 'j1', title: 'Banking System', description: 'Secure banking application', mentor: mentors[1].name },
        { id: 'j2', title: 'Inventory Management', description: 'Enterprise inventory system', mentor: mentors[1].name }
    ],
    'javascript': [
        { id: 'js1', title: 'Real-time Chat App', description: 'WebSocket-based chat application', mentor: mentors[2].name },
        { id: 'js2', title: 'Weather Dashboard', description: 'Interactive weather visualization', mentor: mentors[2].name }
    ],
    'webdev': [
        { id: 'wd1', title: 'Blog Platform', description: 'Full-stack blog application', mentor: mentors[3].name },
        { id: 'wd2', title: 'Recipe Sharing Site', description: 'Community recipe platform', mentor: mentors[3].name }
    ]
};

// Leaderboard data (sorted by rating)
const leaderboard = mentors
    .map(mentor => ({
        ...mentor,
        totalProjects: mentor.projectCount,
        averageRating: mentor.rating
    }))
    .sort((a, b) => b.averageRating - a.averageRating)
    .map((mentor, index) => ({
        ...mentor,
        rank: index + 1
    }));

// Store for user blogs
const userBlogs = {};

// Initialize blogs for each mentor
mentors.forEach(mentor => {
    userBlogs[mentor.id] = mentor.blogs || [];
});
