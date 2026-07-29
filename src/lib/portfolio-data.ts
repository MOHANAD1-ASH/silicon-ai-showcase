import footballImg from "@/assets/project-football.jpg";
import productivityImg from "@/assets/project-productivity.jpg";

export const profile = {
  name: "Mohanad Ashraf Ramadan",
  title: "Machine Learning Engineer",
  tagline: "I build production-ready ML systems from raw, messy data.",
  location: "Cairo, Egypt",
  email: "mohand12ashraf12@gmail.com",
  phone: "+20 112 171 0632",
  github: "https://github.com/MOHANAD1-ASH",
  linkedin: "https://linkedin.com/in/mohanad-ashraf-",
};

export type FeaturedProject = {
  title: string;
  image: string;
  blurb: string;
  metrics: { label: string; value: string }[];
  model: string;
  stack: string[];
  highlights: string[];
  link: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "AI-Powered Football Match Analysis",
    image: footballImg,
    blurb:
      "End-to-end computer vision pipeline turning raw match footage into possession stats, event detection and homography-corrected heatmaps.",
    metrics: [
      { label: "Accuracy", value: "94.2%" },
      { label: "Throughput", value: "38 FPS" },
      { label: "ID switches", value: "-71%" },
    ],
    model: "YOLO + ByteTrack + Kalman",
    stack: ["Python", "YOLO", "OpenCV", "ByteTrack", "Streamlit"],
    highlights: [
      "Custom Kalman-filter ball tracker with dynamic gating and confirm-before-commit logic to reject false positives.",
      "KMeans jersey-colour clustering on top of ByteTrack for automatic team classification.",
      "Player ID stitching via Hungarian assignment and union-find chaining across occlusions and camera cuts.",
      "Two-pass architecture separating detection from rendering for accuracy and speed.",
    ],
    link: "https://github.com/MOHANAD1-ASH/AI-Football-Analysis-System",
  },
  {
    title: "Productive vs. Distracted Detection",
    image: productivityImg,
    blurb:
      "A real-time engagement monitor built from scratch: custom recorded dataset, annotation, and a head-to-head benchmark of two detection architectures.",
    metrics: [
      { label: "mAP@50", value: "98.5%" },
      { label: "Inference", value: "16 ms (62 FPS)" },
      { label: "Precision", value: "99.8%" },
    ],
    model: "YOLO (benchmarked vs. RT-DETR)",
    stack: ["Python", "YOLO", "RT-DETR", "OpenCV", "Streamlit"],
    highlights: [
      "Recorded and annotated a 900-image my own dataset across multiple camera angles, backgrounds and desk setups.",
      "Benchmarked YOLO vs. RT-DETR - YOLO chosen for ~2x faster inference at comparable accuracy.",
      "Rule-based alert engine with configurable timers to flag sustained distraction in real time.",
      "Detections cross-validated against mouse and keyboard activity to suppress false alerts.",
    ],
    link: "https://github.com/MOHANAD1-ASH/Productivity_Monitor",
  },
];

export const moreProjects = [
  {
    title: "Traffic Sign Recognition",
    blurb:
      "Classification pipeline on GTSRB (43 classes, 50k+ images). Custom CNN and MobileNet transfer learning at 97%+ accuracy.",
    tags: "CNN · MobileNet · TensorFlow",
    link: "https://github.com/MOHANAD1-ASH/Elevvo-projects/tree/main/elevvo_project_4",
  },
  {
    title: "Cardiovascular Disease Prediction",
    blurb:
      "EDA, feature engineering and predictive modelling on healthcare data, tuned with a voting-classifier ensemble and deployed on Streamlit.",
    tags: "Scikit-learn · Streamlit",
    link: "https://github.com/MOHANAD1-ASH/Cardiovascular-diesece",
  },
  {
    title: "MovieLens Recommender",
    blurb:
      "Collaborative filtering engine using KNN and cosine similarity across 100,000+ ratings, optimised for personalised suggestions.",
    tags: "Python · Collaborative Filtering",
    link: "https://github.com/MOHANAD1-ASH/Elevvo-projects/tree/main/elevvo_project_3",
  },
  {
    title: "Restaurant Sales Forecasting",
    blurb:
      "Time-series EDA, trend analysis and forecasting on restaurant sales data to support business decision-making.",
    tags: "Python · Time Series",
    link: "https://github.com/MOHANAD1-ASH/Smart-Restaurant-Manager",
  },
];

export const expertise = [
  {
    category: "Programming & Tools",
    items: [
      "Python",
      "SQL (MySQL, PostgreSQL)",
      "Git & GitHub",
      "Jupyter Notebook",
      "VS Code",
      "Colab",
    ],
  },
  {
    category: "Machine Learning & Deep Learning",
    items: [
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "Supervised & Unsupervised Learning",
      "Boosting Algorithms",
      "Neural Networks",
      "CNNs",
      "Hyperparameter Tuning",
      "Feature Engineering",
      "Model Evaluation & Optimization",
    ],
  },
  {
    category: "Computer Vision",
    items: [
      "YOLO (v5–v11, YOLO26)",
      "RT-DETR",
      "OpenCV",
      "Object Detection",
      "Multi-Object Tracking (ByteTrack)",
      "Kalman Filtering",
      "Image Classification",
      "Image Segmentation",
      "Transfer Learning",
    ],
  },
  {
    category: "NLP & Generative AI",
    items: [
      "Hugging Face Transformers",
      "Fine-tuning Pre-trained Models",
      "RAG-based applications",
      "Text Classification",
    ],
  },
  {
    category: "Deployment & MLOps",
    items: [
      "Streamlit",
      "FastAPI",
      "Docker (exposure)",
      "Azure AI Fundamentals (exposure)",
    ],
  },
  {
    category: "Data Analysis & Visualization",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Power BI (basic)",
    ],
  },
];

export const thinkingSteps = [

  {
    step: "01",
    title: "Understand the problem",
    body: "Before a single line of training code: what decision does this model change, what does failure cost, and what does 'good enough' actually mean in production?",
  },
  {
    step: "02",
    title: "Analyse the data",
    body: "EDA, class balance, leakage checks, annotation or label quality. When the dataset doesn't exist, I collect and annotate it myself, whether that's images, text, or tabular records.",
  },
  {
    step: "03",
    title: "Build a baseline",
    body: "The simplest model that could work, wired end-to-end. A plain baseline that runs beats a clever one that never ships, and it sets the bar every iteration has to beat.",
  },
  {
    step: "04",
    title: "Iterate & optimise",
    body: "Architecture benchmarks (classic ML vs. deep nets, CNNs vs. transformers), augmentation, tuning, and custom logic whenever off-the-shelf tools fall short.",
  },
  {
    step: "05",
    title: "Deploy & evaluate",
    body: "Streamlit or FastAPI, latency and resource budgets measured on real hardware, and monitoring that tells me when reality drifts away from the validation set.",
  },
];

export const stats = [
  { value: 12, suffix: "+", label: "ML projects shipped", decimals: 0 },
  { value: 98.5, suffix: "%", label: "Best mAP@50 achieved", decimals: 1 },
  { value: 3, suffix: "", label: "Real-time CV systems", decimals: 0 },
  { value: 16, suffix: "ms", label: "Fastest inference time", decimals: 0 },
];

export const timeline = [
  {
    when: "2026 - Present",
    role: "AI & Data Science Track",
    org: "EM Business Solutions Scholarship",
    points: [
      "Completed intensive project-based training across AI, Data Science and ML workflows.",
      "Built ML and deep learning models with Scikit-learn and PyTorch, including feature engineering and model optimisation.",
      "Developed NLP and Generative AI applications using Hugging Face and RAG-based approaches.",
      "Applied computer vision: image processing, classification, object detection (YOLO), object tracking (ByteTrack) and Vision Transformers.",
      "Deployed ML applications with Streamlit and FastAPI, with hands-on exposure to Docker.",
    ],
  },
  {
    when: "2026",
    role: "Machine Learning Intern",
    org: "Elevvo Pathways",
    points: [
      "Built and optimised end-to-end ML and deep learning pipelines for classification, regression and clustering problems.",
      "Applied core ML techniques with Scikit-learn and developed deep learning models with TensorFlow and Keras.",
      "Conducted data preprocessing, feature engineering and model evaluation, including image resizing for computer vision tasks.",
      "Developed and fine-tuned CNN architectures, leveraging transfer learning for high accuracy on image classification benchmarks.",
    ],
  },
  {
    when: "2025 - Present",
    role: "Machine Learning Engineer Track",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    points: [
      "Completed intensive training covering the full AI lifecycle, from data preprocessing to model deployment.",
      "Performed data preprocessing, feature engineering and EDA with Pandas, NumPy and Scikit-learn.",
      "Implemented ML algorithms (regression, classification, clustering) and built deep learning models for predictive tasks using neural network architectures.",
      "Applied NLP techniques for text analysis and computer vision methods for image-based tasks.",
      "Gained hands-on experience deploying models with MLflow, MLOps practices and Microsoft Azure AI services.",
    ],
  },
  {
    when: "Expected 2027",
    role: "B.Sc. Computer Science & Statistics",
    org: "Helwan University, Faculty of Science",
    points: [
      "Data structures & algorithms, database systems, machine learning & data mining.",
      "Probability, distribution theory and order statistics underpinning applied ML.",
    ],
  },
];
