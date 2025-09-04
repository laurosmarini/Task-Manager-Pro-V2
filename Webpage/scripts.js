// NDI AI Benchmarks - Interactive Scripts

// Toggle group functionality
function toggleGroup(groupId) {
    const group = document.querySelector(`[data-group="${groupId}"]`);
    const content = group.querySelector('.group-content');
    const toggleIcon = group.querySelector('.toggle-icon');

    // Toggle expanded class
    content.classList.toggle('expanded');

    // Rotate toggle icon
    if (content.classList.contains('expanded')) {
        toggleIcon.classList.add('rotated');
    } else {
        toggleIcon.classList.remove('rotated');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('NDI AI Benchmarks loaded successfully');

    // Add keyboard navigation support
    const groupHeaders = document.querySelectorAll('.group-header');

    groupHeaders.forEach(header => {
        // Add keyboard event listener
        header.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const groupId = this.parentElement.getAttribute('data-group');
                toggleGroup(groupId);
            }
        });

        // Add ARIA attributes for accessibility
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');

        // Update ARIA expanded state when toggled
        const content = header.nextElementSibling;
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isExpanded = content.classList.contains('expanded');
                    header.setAttribute('aria-expanded', isExpanded.toString());
                }
            });
        });

        observer.observe(content, {
            attributes: true,
            attributeFilter: ['class']
        });
    });

    // Add smooth scrolling for better UX
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all benchmark groups for scroll animations
    const groups = document.querySelectorAll('.benchmark-group');
    groups.forEach(group => {
        observer.observe(group);
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add error handling for missing elements
    try {
        const main = document.querySelector('main');
        if (!main) {
            console.error('Main element not found');
        }

        const groups = document.querySelectorAll('.benchmark-group');
        if (groups.length === 0) {
            console.error('No benchmark groups found');
        }
    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});

// Utility function to expand all groups
function expandAllGroups() {
    const allGroups = document.querySelectorAll('.benchmark-group');
    allGroups.forEach(group => {
        const groupId = group.getAttribute('data-group');
        const content = group.querySelector('.group-content');
        const toggleIcon = group.querySelector('.toggle-icon');

        content.classList.add('expanded');
        toggleIcon.classList.add('rotated');
    });
}

// Utility function to collapse all groups
function collapseAllGroups() {
    const allGroups = document.querySelectorAll('.benchmark-group');
    allGroups.forEach(group => {
        const content = group.querySelector('.group-content');
        const toggleIcon = group.querySelector('.toggle-icon');

        content.classList.remove('expanded');
        toggleIcon.classList.remove('rotated');
    });
}

// Add global functions to window for potential external access
window.expandAllGroups = expandAllGroups;
window.collapseAllGroups = collapseAllGroups;
window.toggleGroup = toggleGroup;
