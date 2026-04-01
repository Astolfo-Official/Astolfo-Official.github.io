// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-note",
          title: "note",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/notes/";
          },
        },{id: "post-how-to-get-the-casida-equation-in-tddft",
        
          title: "How to Get the Casida Equation in TDDFT",
        
        description: "A note-faithful walkthrough of how linear-response TDDFT becomes the Casida equation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/how-to-get-casida-equation-in-tddft/";
          
        },
      },{id: "post-evaluate-int-0-1-frac-ln-x-x-2-x-1-mathrm-d-x",
        
          title: "Evaluate \(\int_0^1 \frac{\ln x}{x^2-x-1}\,\mathrm{d}x\)",
        
        description: "A residue theorem evaluation of a superhard real integral.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/integal1/";
          
        },
      },{id: "books-baby-math-on-quantum-chemistry",
          title: 'Baby Math on Quantum Chemistry',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/baby_math_on_quantum_chemistry/";
            },},{id: "books-note-on-functional-analysis",
          title: 'Note on Functional Analysis',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/note_on_functional_analysis/";
            },},{id: "books-note-on-theoretical-chemistry",
          title: 'Note on Theoretical Chemistry',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/note_on_theoretical_chemistry/";
            },},{id: "news-let-s-go-first-day-in-my-personal-website",
          title: 'Let’s go! First day in my personal website!',
          description: "",
          section: "News",},{id: "news-new-10k-road-pb-44-38-today",
          title: 'New 10k road PB 44:38 today!',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%73%74%6F%6C%66%6F@%75%64%65%6C.%65%64%75", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=8WzTBusAAAAJ&hl", "_blank");
        },
      },{
        id: 'social-github_profile',
        title: 'Github_profile',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Astolfo-Official", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
