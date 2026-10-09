package com.career.portal.config;

import com.career.portal.entity.*;
import com.career.portal.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final CareerRepository careerRepository;
    private final AssessmentRepository assessmentRepository;
    private final ResourceRepository resourceRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository,
                          SkillRepository skillRepository,
                          CareerRepository careerRepository,
                          AssessmentRepository assessmentRepository,
                          ResourceRepository resourceRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.careerRepository = careerRepository;
        this.assessmentRepository = assessmentRepository;
        this.resourceRepository = resourceRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedSkills();
        seedCareers();
        seedAssessments();
        seedResources();
    }

    private void seedUsers() {
        userRepository.findByEmail("admin@careeros.local").ifPresentOrElse(admin -> {
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }, () -> {
            User admin = new User("CareerOS Admin", "admin@careeros.local", passwordEncoder.encode("admin123"), Role.ADMIN);
            admin.setBio("System Administrator");
            userRepository.save(admin);
        });

        userRepository.findByEmail("student@careeros.local").ifPresentOrElse(student -> {
            student.setPassword(passwordEncoder.encode("student123"));
            student.setRole(Role.USER);
            if (student.getEducation() == null) student.setEducation("B.Tech AIML");
            if (student.getInterests() == null) student.setInterests("software,AI,data,cloud");
            userRepository.save(student);
        }, () -> {
            User student = new User("Madhuri Sharon", "student@careeros.local", passwordEncoder.encode("student123"), Role.USER);
            student.setEducation("B.Tech Computer Science / AIML");
            student.setInterests("software,AI,data,cloud");
            student.setBio("Aspiring Software & AI Engineer passionate about full-stack web and intelligent systems.");
            student.setOrganization("Career Institute of Technology");
            userRepository.save(student);
        });
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = List.of(
                new Skill("Java", "Programming Languages"),
                new Skill("Python", "Programming Languages"),
                new Skill("SQL", "Database & Storage"),
                new Skill("React", "Frontend Development"),
                new Skill("Spring Boot", "Backend Development"),
                new Skill("Data Structures", "Computer Science Fundamentals"),
                new Skill("Machine Learning", "Artificial Intelligence"),
                new Skill("Cloud Computing", "DevOps & Infrastructure"),
                new Skill("Docker", "DevOps & Infrastructure"),
                new Skill("REST APIs", "Backend Development"),
                new Skill("Cybersecurity", "Security"),
                new Skill("HTML/CSS", "Frontend Development"),
                new Skill("JavaScript", "Programming Languages"),
                new Skill("Git", "Tools & Methodologies")
            );
            skillRepository.saveAll(skills);
        }
    }

    private void seedCareers() {
        if (careerRepository.count() == 0) {
            List<Career> careers = List.of(
                new Career("Full Stack Engineer", "Technology",
                        "Designs and builds end-to-end web applications combining robust backend services with modern responsive frontends.",
                        "React,Java,Spring Boot,SQL,REST APIs"),
                new Career("Software Developer", "Technology",
                        "Develops scalable algorithms, enterprise software systems, and data-driven backend architectures.",
                        "Java,Data Structures,SQL,Spring Boot,Git"),
                new Career("AI/ML Engineer", "Artificial Intelligence",
                        "Researches, designs, and trains machine learning models and integrates intelligent algorithms into production systems.",
                        "Python,Machine Learning,SQL,Data Structures"),
                new Career("Data Analyst", "Data & Analytics",
                        "Extracts, transforms, analyzes structured data, and translates raw metrics into actionable business intelligence.",
                        "SQL,Python,Data Structures"),
                new Career("Cloud DevOps Engineer", "Cloud & Infrastructure",
                        "Automates deployment pipelines, cloud provisioning, containerized workloads, and ensures 99.99% system availability.",
                        "Cloud Computing,Docker,Git,Python"),
                new Career("Frontend Engineer", "Technology",
                        "Crafts rich, interactive, accessible user experiences using modern component-driven libraries and JavaScript ecosystems.",
                        "React,JavaScript,HTML/CSS,REST APIs"),
                new Career("Cybersecurity Analyst", "Security & Operations",
                        "Protects networks, applications, and corporate infrastructure against security vulnerabilities, malware, and intrusions.",
                        "Cybersecurity,Python,SQL,Cloud Computing")
            );
            careerRepository.saveAll(careers);
        }
    }

    private void seedAssessments() {
        if (assessmentRepository.count() == 0) {
            List<Assessment> questions = List.of(
                // Java
                new Assessment("Java", "Which keyword is used in Java to inherit a class?", "extends", "implements", "inherits", "super", "A"),
                new Assessment("Java", "Which of the following collection classes provides synchronization?", "ArrayList", "Vector", "LinkedList", "HashSet", "B"),
                new Assessment("Java", "What is the size of a float data type in Java?", "2 bytes", "4 bytes", "8 bytes", "Depends on JVM", "B"),
                new Assessment("Java", "Which method must be implemented by any thread in Java?", "start()", "run()", "execute()", "init()", "B"),

                // Python
                new Assessment("Python", "Which data structure in Python is immutable?", "List", "Dictionary", "Tuple", "Set", "C"),
                new Assessment("Python", "What keyword is used to create an anonymous function in Python?", "def", "func", "lambda", "inline", "C"),
                new Assessment("Python", "What will `bool([])` evaluate to in Python?", "True", "False", "None", "TypeError", "B"),
                new Assessment("Python", "Which module is commonly used in Python for regular expressions?", "regex", "re", "pyregex", "match", "B"),

                // SQL
                new Assessment("SQL", "Which clause is used in SQL to filter rows after group aggregation?", "WHERE", "ORDER BY", "HAVING", "GROUP FILTER", "C"),
                new Assessment("SQL", "Which command is used to permanently remove all rows from a table quickly without logging individual row deletions?", "DELETE", "DROP", "TRUNCATE", "CLEAR", "C"),
                new Assessment("SQL", "Which constraint ensures that all values in a column are distinct?", "NOT NULL", "CHECK", "UNIQUE", "DEFAULT", "C"),
                new Assessment("SQL", "Which type of JOIN returns all records from both tables when there is a match in either?", "INNER JOIN", "FULL OUTER JOIN", "CROSS JOIN", "NATURAL JOIN", "B"),

                // React
                new Assessment("React", "Which hook is used in React to manage state in a functional component?", "useEffect", "useMemo", "useState", "useContext", "C"),
                new Assessment("React", "When does the callback inside `useEffect(..., [])` with an empty dependency array execute?", "On every render", "Only when component unmounts", "Only once after initial mount", "Never", "C"),
                new Assessment("React", "What is the purpose of keys in React lists?", "To style items uniquely", "To identify which items have changed, added, or removed", "To bind click events", "To enable Redux tracking", "B"),
                new Assessment("React", "Which hook memoizes expensive calculations?", "useCallback", "useMemo", "useRef", "useEffect", "B"),

                // Spring Boot
                new Assessment("Spring Boot", "Which annotation combines @Configuration, @EnableAutoConfiguration, and @ComponentScan?", "@SpringBootApplication", "@Service", "@RestController", "@EnableSpring", "A"),
                new Assessment("Spring Boot", "Which annotation is used to inject dependencies automatically?", "@InjectBean", "@Autowired", "@ResourceBean", "@Provide", "B"),
                new Assessment("Spring Boot", "What is the default embedded web server in Spring Boot Web starter?", "Jetty", "Undertow", "Tomcat", "GlassFish", "C"),
                new Assessment("Spring Boot", "Which file is commonly used for external configuration in Spring Boot?", "web.xml", "application.properties", "context.xml", "beans.xml", "B"),

                // Data Structures
                new Assessment("Data Structures", "What is the average time complexity of searching an element in a Hash Table?", "O(1)", "O(n)", "O(log n)", "O(n log n)", "A"),
                new Assessment("Data Structures", "Which data structure follows the Last-In-First-Out (LIFO) principle?", "Queue", "Stack", "Heap", "Linked List", "B"),
                new Assessment("Data Structures", "What is the worst-case time complexity of Quick Sort?", "O(n)", "O(n log n)", "O(n^2)", "O(2^n)", "C"),

                // Machine Learning
                new Assessment("Machine Learning", "Which algorithm is commonly used for supervised classification tasks?", "K-Means", "Random Forest", "PCA", "Apriori", "B"),
                new Assessment("Machine Learning", "What problem occurs when a model performs well on training data but poorly on test data?", "Underfitting", "Overfitting", "Data Drift", "Normalization", "B")
            );
            assessmentRepository.saveAll(questions);
        }
    }

    private void seedResources() {
        if (resourceRepository.count() == 0) {
            List<Resource> resources = List.of(
                new Resource("Java", "Java Programming Masterclass", "Course", "Beginner", "https://dev.java/learn/"),
                new Resource("Java", "Oracle Official Java Documentation", "Docs", "Intermediate", "https://docs.oracle.com/en/java/"),
                new Resource("Python", "Python Official Documentation & Tutorial", "Docs", "Beginner", "https://docs.python.org/3/tutorial/"),
                new Resource("Python", "Python for Everybody Specialization", "Course", "Beginner", "https://www.py4e.com/"),
                new Resource("SQL", "MySQL 8.0 Reference Manual", "Docs", "Intermediate", "https://dev.mysql.com/doc/refman/8.0/en/"),
                new Resource("SQL", "SQL Tutorial by W3Schools", "Course", "Beginner", "https://www.w3schools.com/sql/"),
                new Resource("React", "Official React Documentation (react.dev)", "Docs", "Beginner", "https://react.dev/learn"),
                new Resource("React", "Complete React Developer Guide", "Course", "Intermediate", "https://react.dev/reference/react"),
                new Resource("Spring Boot", "Building a RESTful Web Service with Spring", "Docs", "Beginner", "https://spring.io/guides/gs/rest-service"),
                new Resource("Spring Boot", "Spring Boot Official Reference Documentation", "Docs", "Intermediate", "https://docs.spring.io/spring-boot/"),
                new Resource("Data Structures", "Algorithms and Data Structures Guide", "Course", "Intermediate", "https://visualgo.net/"),
                new Resource("Machine Learning", "Scikit-Learn Machine Learning Documentation", "Docs", "Intermediate", "https://scikit-learn.org/stable/"),
                new Resource("Cloud Computing", "AWS Fundamentals & Cloud Overview", "Course", "Beginner", "https://aws.amazon.com/training/"),
                new Resource("Docker", "Docker Documentation & Getting Started", "Docs", "Beginner", "https://docs.docker.com/get-started/"),
                new Resource("REST APIs", "RESTful API Architectural Guidelines", "Docs", "Beginner", "https://restfulapi.net/"),
                new Resource("Cybersecurity", "OWASP Top 10 Security Risks", "Docs", "Intermediate", "https://owasp.org/www-project-top-ten/")
            );
            resourceRepository.saveAll(resources);
        }
    }
}
