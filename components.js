// Reusable components

function createModal(title, content, onClose) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">${title}</h2>
                <button class="close-modal text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            ${content}
        </div>
    `;
    
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
        if (onClose) onClose();
    };
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    return modal;
}

function createNavbar() {
    const currentHash = window.location.hash.substring(1) || '/';
    const isActive = (path) => {
        if (path === '/') {
            return currentHash === '' || currentHash === '/';
        }
        return currentHash === path || currentHash.startsWith(path + '/');
    };
    
    const currentUser = getCurrentAuthUser();
    
    return `
        <nav class="vc-header sticky top-0 z-50 navbar-glow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="index.html" class="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
                            <img src="logo.png" alt="CampusConnect" class="h-14 w-14 logo-glow" style="filter: drop-shadow(0 0 8px rgba(24, 78, 119, 0.6)) drop-shadow(0 0 12px rgba(26, 117, 159, 0.4));">
                            <span class="ml-3 text-lg font-bold text-white hover:text-indigo-200 transition-colors logo-text-effect" style="text-shadow: 0 0 10px rgba(24, 78, 119, 0.5), 0 0 20px rgba(26, 117, 159, 0.3);">CampusConnect</span>
                        </a>
                    </div>
                    <div class="flex items-center space-x-2">
                        <a href="index.html" class="px-4 py-2 rounded-md text-sm font-medium transition-colors text-white hover:bg-white/20">Home</a>
                        <button onclick="showMentorsPage()" class="px-4 py-2 rounded-md text-sm font-medium transition-colors text-white hover:bg-white/20">Mentors</button>
                        <a href="postfeed.html" class="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-white/20 transition-colors">Post Feed</a>
                        <a href="event.html" class="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-white/20 transition-colors">Events</a>
                        <button onclick="showLeaderboardPage()" class="px-4 py-2 rounded-md text-sm font-medium transition-colors text-white hover:bg-white/20">Leaderboard</button>
                        <button onclick="showGlobalSearch()" class="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-white/20 transition-colors flex items-center">
                            <span class="mr-2">🔍</span> Search
                        </button>
                        <a href="profile.html" class="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-white/20 transition-colors">Profile</a>
                        <div class="flex items-center space-x-2 ml-4 pl-4 border-l border-white/20">
                            <span class="text-white text-sm">${currentUser ? currentUser.name : 'Guest'}</span>
                            <button onclick="logoutUser()" class="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/40 transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
`;
}

function createFooter() {
    return `
        <footer class="vc-footer py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">🎓 CampusConnect</h3>
                        <p class="vc-minor-detail">Your gateway to online learning and mentorship.</p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul class="space-y-2 vc-footer-muted">
                            <li><a href="#/" onclick="event.preventDefault(); router.navigate('/');" class="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#/mentors" onclick="event.preventDefault(); router.navigate('/mentors');" class="hover:text-white transition-colors">Mentors</a></li>
                            <li><a href="#/leaderboard" onclick="event.preventDefault(); router.navigate('/leaderboard');" class="hover:text-white transition-colors">Leaderboard</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Contact</h4>
                        <p class="vc-minor-detail-soft">Email: info@virtualcollege.com</p>
                        <p class="vc-minor-detail-soft">Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8 text-center vc-footer-muted">
                    <p>&copy; 2024 CampusConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function createConnectModal(mentor) {
    const content = `
        <div class="space-y-4">
            <div class="flex space-x-4">
                <button onclick="startVideoCall('${mentor.id}')" class="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all">
                    Start Video Call
                </button>
                <button onclick="startChat('${mentor.id}')" class="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all">
                    Chat
                </button>
            </div>
            <div id="videoCallContainer" style="display: none;" class="mt-4">
                <div class="video-frame h-64 mb-4">
                    <div>Video Call with ${mentor.name}</div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="endCall()" class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">End Call</button>
                </div>
            </div>
            <div id="chatContainer" style="display: none;" class="mt-4">
                <div id="chatMessages" class="border rounded-lg p-4 h-64 overflow-y-auto mb-4 bg-gray-50">
                    <div class="text-center text-gray-500">Chat with ${mentor.name}</div>
                </div>
                <div class="flex space-x-2">
                    <input type="text" id="chatInput" placeholder="Type a message..." class="flex-1 border rounded-lg px-4 py-2">
                    <button onclick="sendMessage('${mentor.id}')" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Send</button>
                </div>
            </div>
        </div>
    `;
    
    const modal = createModal('Connect with ' + mentor.name, content);
    
    window.startVideoCall = function(mentorId) {
        document.getElementById('videoCallContainer').style.display = 'block';
        document.getElementById('chatContainer').style.display = 'none';
    };
    
    window.startChat = function(mentorId) {
        document.getElementById('chatContainer').style.display = 'block';
        document.getElementById('videoCallContainer').style.display = 'none';
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage(mentorId);
            }
        });
    };
    
    window.sendMessage = function(mentorId) {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        if (message) {
            const messagesDiv = document.getElementById('chatMessages');
            if (messagesDiv.innerHTML.includes('Chat with')) {
                messagesDiv.innerHTML = '';
            }
            messagesDiv.innerHTML += `
                <div class="chat-message mb-2">
                    <div class="bg-indigo-100 rounded-lg p-2 inline-block">You: ${message}</div>
                </div>
            `;
            input.value = '';
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            
            // Simulate response
            setTimeout(() => {
                messagesDiv.innerHTML += `
                    <div class="chat-message mb-2 text-right">
                        <div class="bg-gray-200 rounded-lg p-2 inline-block">${mentor.name}: Thanks for your message!</div>
                    </div>
                `;
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }, 1000);
        }
    };
    
    window.endCall = function() {
        document.getElementById('videoCallContainer').style.display = 'none';
    };
}

function createPaymentModal(mentor) {
    const content = `
        <div class="space-y-4">
            <p class="text-gray-700">Private mentorship with <strong>${mentor.name}</strong></p>
            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between mb-2">
                    <span>Monthly Subscription</span>
                    <span class="font-bold">$99/month</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span>One-on-one sessions</span>
                    <span>✓</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span>Priority support</span>
                    <span>✓</span>
                </div>
            </div>
            <div class="space-y-2">
                <label class="block text-sm font-medium">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" class="w-full border rounded-lg px-4 py-2" maxlength="19">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium">Expiry</label>
                    <input type="text" placeholder="MM/YY" class="w-full border rounded-lg px-4 py-2" maxlength="5">
                </div>
                <div>
                    <label class="block text-sm font-medium">CVV</label>
                    <input type="text" placeholder="123" class="w-full border rounded-lg px-4 py-2" maxlength="3">
                </div>
            </div>
            <button onclick="processPayment('${mentor.id}')" class="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-all">
                Complete Payment
            </button>
        </div>
    `;
    
    const modal = createModal('Private Mentorship', content);
    
    window.processPayment = function(mentorId) {
        const mentor = mentors.find(m => m.id === mentorId);
        modal.classList.remove('active');
        setTimeout(() => {
            alert(`✅ Payment successful! You're now connected with ${mentor.name} privately!`);
        }, 100);
    };
}

function createProjectModal(mentorId) {
    const content = `
        <form id="projectForm" class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Project Title</label>
                <input type="text" id="projectTitle" required class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Description</label>
                <textarea id="projectDescription" required class="w-full border rounded-lg px-4 py-2" rows="4"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Project Link</label>
                <input type="url" id="projectLink" required class="w-full border rounded-lg px-4 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Image URL</label>
                <input type="url" id="projectImage" required class="w-full border rounded-lg px-4 py-2">
            </div>
            <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all">
                Publish Project
            </button>
        </form>
    `;
    
    const modal = createModal('Publish New Project', content);
    
    document.getElementById('projectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const project = {
            id: 'p' + Date.now(),
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            link: document.getElementById('projectLink').value,
            image: document.getElementById('projectImage').value
        };
        
        const mentor = mentors.find(m => m.id === mentorId);
        if (mentor) {
            mentor.projects.push(project);
            mentor.projectCount++;
        }
        
        modal.classList.remove('active');
        router.navigate(`/mentors/${mentorId}`);
    });
}

function showGlobalSearch() {
    const content = `
        <div class="space-y-4">
            <input type="text" id="globalSearchInput" placeholder="Search courses, mentors, posts, events..." 
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none">
            <div id="globalSearchResults" class="max-h-96 overflow-y-auto space-y-2"></div>
        </div>
    `;
    
    const modal = createModal('🔍 Global Search', content);
    
    const searchInput = document.getElementById('globalSearchInput');
    const resultsDiv = document.getElementById('globalSearchResults');
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        
        if (query.length < 2) {
            resultsDiv.innerHTML = '';
            return;
        }
        
        let results = [];
        
        // Search courses
        courses.forEach(course => {
            if (course.name.toLowerCase().includes(query) || course.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'course',
                    title: course.name,
                    description: course.description,
                    action: () => router.navigate(`/learn/${course.id}`)
                });
            }
        });
        
        // Search mentors
        mentors.forEach(mentor => {
            if (mentor.name.toLowerCase().includes(query) || mentor.skills.some(s => s.toLowerCase().includes(query))) {
                results.push({
                    type: 'mentor',
                    title: mentor.name,
                    description: mentor.skills.join(', '),
                    action: () => router.navigate(`/mentors/${mentor.id}`)
                });
            }
        });
        
        // Search posts (from localStorage)
        try {
            const posts = JSON.parse(localStorage.getItem('virtualCollegePosts')) || [];
            posts.forEach(post => {
                if (post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)) {
                    results.push({
                        type: 'post',
                        title: post.title,
                        description: post.content.substring(0, 100),
                        action: () => window.location.href = 'postfeed.html'
                    });
                }
            });
        } catch (e) {}
        
        // Search events (from localStorage)
        try {
            const events = JSON.parse(localStorage.getItem('virtualCollegeEvents')) || [];
            events.forEach(event => {
                if (event.title.toLowerCase().includes(query) || event.description.toLowerCase().includes(query)) {
                    results.push({
                        type: 'event',
                        title: event.title,
                        description: event.collegeName,
                        action: () => window.location.href = 'event.html'
                    });
                }
            });
        } catch (e) {}
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p class="text-gray-500 text-center py-4">No results found</p>';
            return;
        }
        
        const typeIcons = {
            course: '📚',
            mentor: '👨‍🏫',
            post: '📝',
            event: '📅'
        };
        
        resultsDiv.innerHTML = results.slice(0, 10).map(result => `
            <div class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onclick="executeSearchAction('${result.type}', ${results.indexOf(result)})">
                <div class="flex items-start space-x-3">
                    <span class="text-2xl">${typeIcons[result.type]}</span>
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-900">${result.title}</h4>
                        <p class="text-sm text-gray-600 mt-1">${result.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        window.executeSearchAction = function(type, index) {
            results[index].action();
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };
    });
    
    searchInput.focus();
}
