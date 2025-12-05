// Main application logic

// Home page
function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = createNavbar() + `
        <div class="min-h-screen flex flex-col">
            <div class="vc-home-hero py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-5xl md:text-6xl font-extrabold mb-6 vc-hero-title">Welcome to CampusConnect</h1>
                    <p class="text-xl md:text-2xl mb-4 vc-hero-tagline">Choose a course to start your learning journey</p>
                    <p class="text-lg vc-minor-detail">Learn from expert mentors and build amazing projects</p>
                </div>
            </div>
            
            <div class="flex-grow w-full vc-home-body-outer py-16 -mt-10">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full vc-home-body">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 vc-text-dark">
                    ${courses.map(course => `
                        <div class="rounded-xl shadow-lg p-6 card-hover transition-all cursor-pointer border vc-card-border vc-course-card" onclick="router.navigate('/learn/${course.id}')">
                            <div class="text-5xl mb-4 text-center">📚</div>
                            <h3 class="text-2xl font-bold mb-3 text-center text-white">${course.name}</h3>
                            <p class="mb-4 text-center">${course.description}</p>
                            <button class="mt-4 vc-course-btn px-6 py-3 rounded-lg transition-all w-full font-semibold shadow-md">
                                Learn More →
                            </button>
                        </div>
                    `).join('')}
                    </div>
                </div>
            </div>
            ${createFooter()}
        </div>
    `;
}

// Course detail page
function renderCourse(courseName) {
    const course = courses.find(c => c.id === courseName);
    if (!course) {
        router.navigate('/');
        return;
    }
    
    const courseMentorsList = courseMentors[courseName] || [];
    const courseProjectsList = courseProjects[courseName] || [];
    
    const app = document.getElementById('app');
    app.innerHTML = createNavbar() + `
        <div style="background-color: #184E77; min-height: 100vh;">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="mb-8">
                    <button onclick="window.location.hash = '#/'" class="text-white hover:text-yellow-300 mb-4 flex items-center font-semibold text-lg">
                        <span class="mr-2">←</span> Learn Previously
                    </button>
                    <div style="background: #1A759F; border-radius: 12px; padding: 40px; border: 2px solid rgba(255, 255, 255, 0.1); margin-bottom: 30px;">
                        <h1 class="text-4xl font-bold text-white mb-4">${course.name} Course</h1>
                        <p class="text-xl text-white/80">${course.description}</p>
                    </div>
                </div>
            
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
                            <span class="mr-2">👨‍🏫</span> Mentors for ${course.name}
                        </h2>
                        <div class="space-y-4">
                            ${courseMentorsList.map(mentor => `
                                <div style="background: #1A759F; border-radius: 12px; padding: 20px; border: 2px solid rgba(255, 255, 255, 0.1);">
                                    <div class="flex items-center space-x-4 mb-4">
                                        <img src="${mentor.photo}" alt="${mentor.name}" class="w-20 h-20 rounded-full border-4" style="border-color: #FCD34D;">
                                        <div class="flex-1">
                                            <h3 class="text-xl font-bold text-white">${mentor.name}</h3>
                                            <p class="text-sm text-white/80">${mentor.skills.join(', ')}</p>
                                            <div class="flex items-center mt-2">
                                                <span class="text-yellow-400 font-semibold">⭐ ${mentor.rating}</span>
                                                <span class="text-white/60 ml-4 text-sm">${mentor.projectCount} projects</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onclick="window.location.hash = '#/mentors/${mentor.id}'" class="w-full px-4 py-2 rounded-lg font-semibold transition-all" style="background: linear-gradient(135deg, #184E77 0%, #1A759F 100%); color: white; border: 1px solid #FCD34D;">
                                        👁️ View Profile
                                    </button>
                                    <button onclick="alert('Message sent to ${mentor.name}! 📬')" class="w-full px-4 py-2 rounded-lg font-semibold transition-all mt-2" style="background: #FCD34D; color: #184E77; border: none; font-weight: bold;">
                                        💬 Connect
                                    </button>
                                </div>
                            `).join('')}
                            ${courseMentorsList.length === 0 ? '<p class="text-white/60">No mentors assigned yet for this course.</p>' : ''}
                        </div>
                    </div>
                    
                    <div>
                        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
                            <span class="mr-2">🚀</span> Related Projects
                        </h2>
                        <div class="space-y-4">
                            ${courseProjectsList.map(project => `
                                <div style="background: #1A759F; border-radius: 12px; padding: 20px; border: 2px solid rgba(255, 255, 255, 0.1);">
                                    <h3 class="text-xl font-bold text-white mb-2">${project.title}</h3>
                                    <p class="text-white/80 mb-3">${project.description}</p>
                                    <p class="text-sm text-yellow-400 font-semibold mb-3">👨‍🏫 Mentor: ${project.mentor}</p>
                                    <button onclick="alert('Opening project: ${project.title}')" class="w-full px-4 py-2 rounded-lg font-semibold" style="background: #FCD34D; color: #184E77; border: none; font-weight: bold;">
                                        View Project 🔗
                                    </button>
                                </div>
                            `).join('')}
                            ${courseProjectsList.length === 0 ? '<p class="text-white/60">No projects available yet for this course.</p>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${createFooter()}
    `;
}

// Mentors page
function renderMentors() {
    const app = document.getElementById('app');
    app.innerHTML = createNavbar() + `
        <div class="vc-mentors-body min-h-screen" style="background-color: #184E77;">
            <div class="vc-mentors-hero text-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">Our Expert Mentors</h1>
                    <p class="text-xl opacity-90">Learn from the best in the industry</p>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${mentors.map(mentor => `
                        <div class="vc-mentor-card rounded-xl shadow-lg overflow-hidden transition-all border" style="background: #1A759F; border: 2px solid rgba(255, 255, 255, 0.1);">
                            <img src="${mentor.photo}" alt="${mentor.name}" class="w-full h-48 object-cover">
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-white text-center mb-2">${mentor.name}</h3>
                                <div class="flex flex-wrap justify-center gap-2 mb-4">
                                    ${mentor.skills.slice(0, 3).map(skill => `
                                        <span class="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">${skill}</span>
                                    `).join('')}
                                </div>
                                <div class="flex justify-center items-center mb-4">
                                    <span style="color: #FCD34D; font-weight: bold;">⭐ ${mentor.rating}</span>
                                    <span class="text-white/60 ml-4 text-sm">${mentor.projectCount} projects</span>
                                </div>
                                <button onclick="window.location.hash = '#/mentors/${mentor.id}'" class="w-full px-4 py-2 rounded-lg text-white font-semibold transition-all" style="background: linear-gradient(135deg, #184E77 0%, #1A759F 100%); border: 1px solid #FCD34D;">
                                    View Profile →
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        ${createFooter()}
    `;
}

// Mentor profile page
function renderMentorProfile(mentorId) {
    const mentor = mentors.find(m => m.id === mentorId);
    if (!mentor) {
        router.navigate('/mentors');
        return;
    }
    
    const app = document.getElementById('app');
    app.innerHTML = createNavbar() + `
        <div class="min-h-screen" style="background: #184E77;">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button onclick="router.navigate('/mentors')" class="text-white hover:text-gray-200 mb-6 flex items-center font-semibold">
                    <span class="mr-2">←</span> Back to Mentors
                </button>
                
                <div class="rounded-xl shadow-lg p-8 mb-8 border border-gray-100 vc-mentor-card">
                    <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <img src="${mentor.photo}" alt="${mentor.name}" class="w-40 h-40 rounded-full border-4 border-white shadow-lg">
                        <div class="flex-1 text-center md:text-left">
                            <h1 class="text-4xl font-bold text-white mb-3">${mentor.name}</h1>
                            <p class="text-gray-100 mb-4 text-lg">${mentor.bio}</p>
                            <div class="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                                ${mentor.skills.map(skill => `
                                    <span class="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">${skill}</span>
                                `).join('')}
                            </div>
                            <div class="flex items-center justify-center md:justify-start space-x-6">
                                <span class="text-yellow-300 text-xl font-semibold">⭐ ${mentor.rating}</span>
                                <span class="text-gray-200 text-lg">${mentor.projectCount} projects</span>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-3 w-full md:w-auto">
                            <button onclick="showConnectModal('${mentor.id}')" class="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-md font-semibold">
                                💬 Connect
                            </button>
                            <button onclick="showPaymentModal('${mentor.id}')" class="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-all shadow-md font-semibold">
                                💰 Learn Privately
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-white flex items-center">
                                <span class="mr-2">🚀</span> Projects
                            </h2>
                            <button onclick="showProjectModal('${mentor.id}')" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-semibold shadow-md">
                                + Publish Project
                            </button>
                        </div>
                        <div class="space-y-4">
                            ${mentor.projects.map(project => `
                                <div class="rounded-xl shadow-md p-6 border border-gray-100 card-hover transition-all vc-mentor-card">
                                    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover rounded-lg mb-4 border border-gray-200">
                                    <h3 class="text-xl font-bold text-white mb-2">${project.title}</h3>
                                    <p class="text-gray-200 mb-4">${project.description}</p>
                                    <a href="${project.link}" target="_blank" class="text-yellow-300 hover:text-yellow-200 font-semibold inline-flex items-center">
                                        View Project <span class="ml-1">→</span>
                                    </a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
                            <span class="mr-2">✍️</span> Blog Posts
                        </h2>
                        <div class="space-y-4">
                            ${mentor.blogs.map(blog => `
                                <div class="rounded-xl shadow-md p-6 cursor-pointer card-hover transition-all border border-gray-100 vc-mentor-card" onclick="router.navigate('/blogs/${mentor.id}/${blog.id}')">
                                    <h3 class="text-xl font-bold text-white mb-2">${blog.title}</h3>
                                    <p class="text-gray-200 mb-2">${blog.content.substring(0, 100)}...</p>
                                    <p class="text-sm text-gray-300">${new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            `).join('')}
                        </div>
                        <button onclick="router.navigate('/blogs/${mentor.id}')" class="mt-4 w-full bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold shadow-md">
                            View All Blogs →
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ${createFooter()}
    `;
    
    window.showConnectModal = function(id) {
        const m = mentors.find(ment => ment.id === id);
        createConnectModal(m);
    };
    
    window.showPaymentModal = function(id) {
        const m = mentors.find(ment => ment.id === id);
        createPaymentModal(m);
    };
    
    window.showProjectModal = function(id) {
        createProjectModal(id);
    };
}

// Blog page
function renderBlog(username, blogId = null) {
    const mentor = mentors.find(m => m.id === username);
    if (!mentor) {
        router.navigate('/');
        return;
    }
    
    const blogs = userBlogs[username] || [];
    const selectedBlog = blogId ? blogs.find(b => b.id === blogId) : null;
    
    const app = document.getElementById('app');
    
    if (selectedBlog) {
        // Show single blog post
        app.innerHTML = createNavbar() + `
            <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <button onclick="router.navigate('/blogs/${username}')" class="text-indigo-600 hover:text-indigo-800 mb-6 flex items-center font-semibold">
                        <span class="mr-2">←</span> Back to Blogs
                    </button>
                    <article class="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-100">
                        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">${selectedBlog.title}</h1>
                        <p class="text-gray-500 mb-8 text-lg">📅 ${new Date(selectedBlog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <div class="prose max-w-none">
                            <p class="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">${selectedBlog.content}</p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        ${createFooter()}
        `;
    } else {
        // Show blog list and editor
        app.innerHTML = createNavbar() + `
            <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 class="text-4xl md:text-5xl font-bold mb-2">${mentor.name}'s Blog</h1>
                        <p class="text-xl opacity-90">Share your thoughts and knowledge</p>
                    </div>
                </div>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span class="mr-2">✍️</span> Write New Blog Post
                            </h2>
                            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <form id="blogForm" class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-2 text-gray-700">Title</label>
                                        <input type="text" id="blogTitle" required class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-2 text-gray-700">Content</label>
                                        <div id="blogContent" contenteditable="true" class="blog-editor" placeholder="Start writing your blog post..."></div>
                                    </div>
                                    <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-md">
                                        Publish Blog →
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span class="mr-2">📚</span> Published Blogs
                            </h2>
                            <div class="space-y-4">
                                ${blogs.length > 0 ? blogs.map(blog => `
                                    <div class="bg-white rounded-xl shadow-md p-6 cursor-pointer card-hover transition-all border border-gray-100" onclick="router.navigate('/blogs/${username}/${blog.id}')">
                                        <h3 class="text-xl font-bold text-gray-900 mb-2">${blog.title}</h3>
                                        <p class="text-gray-600 mb-2">${blog.content.substring(0, 150)}...</p>
                                        <p class="text-sm text-gray-500">📅 ${new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                `).join('') : '<div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center text-gray-500">No blogs published yet</div>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${createFooter()}
        `;
        
        document.getElementById('blogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('blogTitle').value;
            const content = document.getElementById('blogContent').textContent;
            
            if (title && content) {
                const newBlog = {
                    id: 'b' + Date.now(),
                    title: title,
                    content: content,
                    date: new Date().toISOString().split('T')[0]
                };
                
                if (!userBlogs[username]) {
                    userBlogs[username] = [];
                }
                userBlogs[username].unshift(newBlog);
                
                document.getElementById('blogTitle').value = '';
                document.getElementById('blogContent').textContent = '';
                
                router.navigate(`/blogs/${username}`);
            }
        });
    }
}

// Leaderboard page
function renderLeaderboard() {
    const app = document.getElementById('app');
    app.innerHTML = createNavbar() + `
        <div class="vc-leaderboard-body min-h-screen">
            <div class="vc-leaderboard-hero text-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">🏆 Leaderboard</h1>
                    <p class="text-xl opacity-90">Top mentors ranked by ratings</p>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-6">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${leaderboard.map((mentor, index) => {
                            let rankClass = 'bg-gray-200';
                            if (index === 0) rankClass = 'rank-1';
                            else if (index === 1) rankClass = 'rank-2';
                            else if (index === 2) rankClass = 'rank-3';
                            
                            return `
                                <tr class="${index < 3 ? 'bg-yellow-50' : ''}">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="rank-badge ${rankClass}">${mentor.rank}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <img src="${mentor.photo}" alt="${mentor.name}" class="w-10 h-10 rounded-full mr-3">
                                            <div>
                                                <div class="text-sm font-medium text-gray-900">${mentor.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex flex-wrap gap-1">
                                            ${mentor.skills.slice(0, 2).map(skill => `
                                                <span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">${skill}</span>
                                            `).join('')}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${mentor.projectCount}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="text-yellow-500">⭐ ${mentor.rating}</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button onclick="router.navigate('/mentors/${mentor.id}')" class="text-indigo-600 hover:text-indigo-800">
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        ${createFooter()}
    `;
}

// Set up routes
// Helper functions for header buttons
function showMentorsPage() {
    window.location.hash = '#/mentors';
    router.handleRoute();
}

function showLeaderboardPage() {
    window.location.hash = '#/leaderboard';
    router.handleRoute();
}

function showGlobalSearch() {
    alert('Search feature coming soon! 🔍');
}

router.addRoute('/', renderHome);
router.addRoute('/learn/:courseName', renderCourse);
router.addRoute('/mentors', renderMentors);
router.addRoute('/mentors/:id', renderMentorProfile);
router.addRoute('/blogs/:username', renderBlog);
router.addRoute('/blogs/:username/:id', (username, blogId) => renderBlog(username, blogId));
router.addRoute('/leaderboard', renderLeaderboard);
