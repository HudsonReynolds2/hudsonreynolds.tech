// ============================================================================
// PROJECTS CONFIG
// ----------------------------------------------------------------------------
// Each project is an entry in the `projects` array below.
//
//   - `featured: true` makes it appear on the home page grid.
//     Only the first ~5 featured projects render on /.
//   - `slug` is the URL path (/projects/<slug>).
//   - `image` is a path under /public/images/projects/...
//     Drop your files into that folder and reference them here by filename.
//   - `gallery` is optional; extra images for the detail page.
//   - `sections` is the long-form writeup on the detail page.
//     Each section has a heading and markdown-ish body (simple paragraphs).
//
// To add a new project:
//   1. Copy an existing entry
//   2. Change the slug, title, tags, image, body text
//   3. Save. Astro rebuilds the page automatically.
// ============================================================================

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectSection = {
  heading: string;
  body: string; // paragraphs separated by blank lines; preserves line breaks
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;          // 1-2 sentence pitch shown on cards
  tags: string[];
  image: string;            // hero image path
  gallery?: string[];       // extra images for detail page
  links?: ProjectLink[];    // github, paper, poster, etc.
  featured?: boolean;       // show on homepage
  year?: string;            // "2025", "2024-25", etc.
  role?: string;            // your role on the project
  sections?: ProjectSection[]; // long-form writeup
};

// ----------------------------------------------------------------------------

export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. FROSTBYTE — senior capstone
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "frostbyte",
    title: "FrostByte",
    subtitle: "Multi-Sensor Black Ice Detection Platform",
    summary:
      "A scalable ice detection platform that fuses RGB, thermal, mmWave radar, " +
      "and temperature data on a Raspberry Pi 5. Senior capstone, team lead.",
    tags: [
      "Embedded Linux",
      "balenaOS",
      "Docker",
      "Python",
      "Sensor Fusion",
      "mmWave Radar",
      "Thermal Imaging",
      "U-Net",
      "Raspberry Pi",
    ],
    image: "/images/projects/frostbyte/FrostbyteDevice.png",
    gallery: [
      "/images/projects/frostbyte/overview.png",
      "/images/projects/frostbyte/systemOverview.png",
      "/images/projects/frostbyte/fullSystemDiagram.png",
      "/images/projects/frostbyte/Enclosure.png",
      "/images/projects/frostbyte/weatherproofing.png",
      "/images/projects/frostbyte/softwareArchitectureDevice.png",
      "/images/projects/frostbyte/softwareArchitectureServer.png",
      "/images/projects/frostbyte/NotificationServerArchitectureDiagram.png",
      "/images/projects/frostbyte/modelArchitecture.png",
      "/images/projects/frostbyte/radarMapping.png",
      "/images/projects/frostbyte/radarOverlay.jpg",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/HudsonReynolds2/frostbyte" },
    ],
    featured: true,
    year: "2025–26",
    role: "Team Lead · Sensors, Systems Integration & Testing",
    sections: [
      {
        heading: "Overview",
        body:
          "FrostByte is a scalable ice detection platform designed to help two main stakeholders: municipalities and land-managing organizations preventing accidents through targeted ice removal, alongside pedestrians and drivers trying to avoid ice on their route. Each FrostByte device is equipped with a weatherproof, multi-modal sensor array consisting of a visible light camera, thermal infrared camera, millimeter-wave radar, and temperature sensors, enabling comprehensive surface analysis across a wide range of conditions.\n\n" +
          "FrostByte devices connect over Power over Ethernet to a cloud backend where a management dashboard provides complete sensor control, automated time-of-day configuration scheduling, and a data labeling tool for building ice detection datasets, designed to support many concurrent devices and users. The synchronized multi-modal data is used to train on-device deep learning models, improving detection accuracy at each location. Pedestrians and drivers are served through companion iOS and Android apps delivering proximity and route-based ice alerts with user-defined notification settings.",
      },
      {
        heading: "Forming the Team",
        body:
          "I started FrostByte the summer before senior year. I wanted a capstone that tackled a real technical problem in sensing and embedded systems, so I pitched the idea to each of the four other team members individually and recruited based on what they could contribute. I also convinced Professor Sebesta to serve as our client. The concept went through a few iterations, starting with a marine science framing, before we landed on black ice as the target problem.\n\n" +
          "Over that summer, I bought most of the initial hardware out of pocket so we could start prototyping on day one instead of waiting on procurement. That included the Raspberry Pi 5, Pi 2W, microSD cards, PoE+ switch, ethernet cabling, the RGB Pi Camera, calipers, jumper wires, a multimeter, and a Lambda Concept Lattice FPGA for early radar experiments. By the first week of the semester every sensor had a working API and at least a basic dashboard, which set the pace for the rest of the year.",
      },
      {
        heading: "Architecture",
        body:
          "The Pi runs balenaOS, which manages the application as a set of Docker containers. Every piece of code in the project, from the sensor services on the Pi to the backend and dashboard, was developed in Docker from day one. Balena added a layer of complexity on top of that (pinning architecture digests, working around fleet deployment quirks, keeping local development fast) but the fleet management and rollback guarantees were worth the effort for a multi-device platform.\n\n" +
          "Each sensor is exposed through a FastAPI capture service that writes timestamped samples to an in-memory Redis store, and a synchronized capture service uses a ThreadPoolExecutor to align frames across all four modalities in under 500 ms. The multithreading matters: because the captures are tightly packed in time, parallel execution is what makes real sensor fusion possible instead of a sequence of loosely related frames. A device client bridges the Pi to the cloud backend over WebSocket, while a separate uploader pushes bulk data (raw frames, model outputs, metadata) to MinIO object storage and PostgreSQL.\n\n" +
          "The entire cloud stack (FastAPI backend, React dashboard, PostgreSQL, MinIO, and a Cloudflare Tunnel for remote access without a VPN client) runs on my Linux machine, which has served as our production host for the semester. The system was built from the start for concurrent users and long-term operation: the in-memory sample store means sensor traffic never touches the microSD card, the multithreaded capture path keeps end-to-end latency low, and the backend is designed so many operators can manage many devices without contention.\n\n" +
          "I led the architecture decisions that shaped this stack, and I designed the architecture for the notification system: how device-level detections map to geo-indexed alerts, how proximity and route-based triggers are evaluated on the backend, and how per-user notification settings flow through to the iOS and Android apps.",
      },
      {
        heading: "What I Built",
        body:
          "My work cut across most of the subsystems, with the sensor layer, system architecture, testing infrastructure, and parts of the model pipeline as the main areas I owned.\n\n" +
          "On the sensor side, I got every sensor working end-to-end in both cloud and local modes: the FLIR Lepton thermal camera (which needed firmware work and a Pi 5 device-tree overlay), the IWR1843BOOST mmWave radar (GPIO reset handling and careful sequencing of its CLI and data ports to survive USB re-enumeration), the Pico 2W temperature sensor over UART (a dtoverlay fix and agetty conflict resolution to stream cleanly), and the RGB camera with a Flask tuning dashboard for manual focus, exposure, gain, white balance, and resolution. I also set up all of the network infrastructure that ties these together.\n\n" +
          "On the model side, I built the porthole mask tool that isolates the road surface from surrounding scene, the radar feature threshold gating that filters surface returns by reflectivity and roughness, the temperature gating that applies physical priors based on surface temperature, and large parts of the configuration pipeline that drives both the per-schedule capture profiles and the model parameters from a single JSON schema. These pieces are what let the heuristic and learned detectors actually trust their inputs.\n\n" +
          "I built the integration test suite that the team relies on. Each test exercises a sensor's full API surface, downloads the resulting frames from Redis, reads their metadata, and reports pass or fail per test based on what the real captures actually contain. The RGB suite alone covers thirteen sections (capture, manual focus at multiple lens positions, exposure and gain sweeps, white balance, resolution steps up to full 12 MP, rotation and flip, camera lifecycle, a stress test with back-to-back captures, and Redis and container health). The IR suite checks that the Lepton reports its real resolution instead of a fallback, validates radiometric temperature statistics, and confirms FFC calibration recovers cleanly. The radar suite covers both TLV and DCA capture modes across a full initialize, capture, and teardown lifecycle.\n\n" +
          "To make the test loop work without waiting on a real Pi, I built a mock Pi that runs in Docker with mock implementations of every sensor. It exposes the same HTTP and WebSocket surface as the real device, so the same tests run against it unchanged. That meant team members could develop against the full system from their laptops, and we could run the backend test suite in predictable loops against a deterministic device.\n\n" +
          "Beyond sensors, testing, and the model, I helped CAD the weatherproof prototypes, contributed to the backend dashboard, and acted as the main reviewer on other members' work across subsystems.",
      },
      {
        heading: "Leadership and Learning",
        body:
          "Running a five-person capstone meant real project management, not just code. I maintained a Jira board with epics, items, and timelines for each subsystem, built Gantt charts to map dependencies across the semester, and did a lot of the work breakdown that translated our high-level system goals into owned, scoped tasks for each team member. That planning work is often invisible on a finished project, but it was what kept four independent subsystems converging toward a working whole.\n\n" +
          "The biggest learning curve was the shift from building a prototype to building a product. Deciding which sensor problems were worth solving perfectly and which were worth accepting a rough edge on, when to let a team member own a subsystem versus stepping in to help, and how to sequence integration so the system actually came together instead of converging at the last minute: none of that is taught in a class. The mock Pi and the integration test suite were partly an investment along those lines. Infrastructure that makes the whole team faster is probably the single highest-leverage thing a team lead can build.",
      },
      {
        heading: "What's Next",
        body:
          "With the platform operational, the team is planning to continue the work past graduation with a paper write-up of the system and an impact study evaluating FrostByte in real deployments. The goal is to move from a capstone demonstration to a piece of published infrastructure research that other groups can build on.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ECHOES OF EARTH — SC25 research (Aggregator-Pi + Listener)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "echoes-of-earth",
    title: "Echoes of Earth",
    subtitle: "Autonomous Environmental Lab for Acoustic Sensing",
    summary:
      "A solar-powered, WiFi-HaLow-networked bioacoustic sensing system that " +
      "sustains 25 concurrent recording nodes per aggregator. Presented at SC25.",
    tags: [
      "Distributed Systems",
      "ESP32-S3",
      "Raspberry Pi",
      "WiFi HaLow",
      "BirdNET",
      "Redis",
      "BalenaOS",
      "Chameleon Cloud",
      "Edge Computing",
    ],
    //image: "/images/projects/echoes-hero.jpg",
    image: "/images/projects/echoesofearth/echoesofearthposter.jpg",
    gallery: [
      "/images/projects/echoes-architecture.jpg",
      "/images/projects/echoes-listener.jpg",
      "/images/projects/echoes-aggregator.jpg",
      "/images/projects/echoes-deployment.jpg",
    ],
    links: [
      {
        label: "SC25 Poster Page",
        href: "https://sc25.supercomputing.org/proceedings/posters/poster_pages/post184.html",
      },
      {
        label: "Aggregator-Pi",
        href: "https://github.com/atuecke/aggregator-pi",
      },
      {
        label: "wav-streamer (Listener firmware)",
        href: "https://github.com/HudsonReynolds2/wav-streamer",
      },
      {
        label: "esp32p4-usb-audiomoth",
        href: "https://github.com/HudsonReynolds2/esp32p4-usb-audiomoth",
      },
      {
        label: "Project Website",
        href: "https://atuecke.github.io/aggregator-pi-website/",
      },
    ],
    featured: true,
    year: "2025",
    role: "Co-lead · REU at UChicago BigDataX / Argonne",
    sections: [
      {
        heading: "Overview",
        body:
          "Real-time bioacoustic monitoring is a powerful tool for biodiversity conservation, but the industry-standard recording devices cost $600–$1,000+, require manual data retrieval, and offer no live status. Deployments don't scale, and malfunctioning devices can lose months of data before anyone notices.\n\n" +
          "Echoes of Earth is an end-to-end system I co-developed with Alex Tuecke under advisors Mike Sherman (UChicago) and Kate Keahey (Argonne National Laboratory) during the BigDataX REU. We built two devices — Listener (a solar-powered edge recorder) and Aggregator (a Raspberry Pi 5 collection and inference node) — and a cloud pipeline on Chameleon. The system was presented as a poster at SC25.",
      },
      {
        heading: "Listener",
        body:
          "Listener is the field device. Each one is an ESP32-S3 paired with an open-source AudioMoth Dev board running AudioMoth-USB-Microphone firmware, a 512 GB MicroSD, a WiFi HaLow transceiver, and a 10 W Voltaic solar panel with a battery. The whole unit lives inside the weatherproof AudioMoth Dev enclosure and costs about $375 — a fraction of a commercial equivalent.\n\n" +
          "Listener streams 16-bit PCM audio at 48 kHz (768 kbps) to match the quality field ecologists expect, and sends it over an HTTP endpoint on the HaLow network. If the link goes down, the onboard SD card buffers up to 8 weeks of continuous audio and catches up seamlessly when connectivity returns — the entire recovery path is transparent to the aggregator.",
      },
      {
        heading: "Aggregator",
        body:
          "Aggregator is a Raspberry Pi 5 connected to a Heltec 7608 WiFi HaLow router over ethernet, with a 2.4 GHz uplink to the cloud. The extended-star topology collapses the infrastructure needed for a large deployment — one aggregator serves many Listeners over a kilometer of range.\n\n" +
          "Aggregator runs balenaOS with a Dockerized stack of Go and Python services coordinated by an in-memory Redis job queue. Audio uploads and BirdNET analysis jobs are decoupled through Redis, which both batches small writes (extending SD-card life) and lets the two workloads scale independently. BirdNET runs locally on the Pi, so analysis happens at the edge and only the results — not the raw audio — need to be uploaded in real time.",
      },
      {
        heading: "Results",
        body:
          "We evaluated the system at 1, 5, and 25 simulated Listeners streaming to a real Aggregator. Under the most strenuous workload — simultaneous upload and BirdNET analysis for 25 concurrent Listeners — the Aggregator averaged 81% CPU utilization with a stable Redis queue depth of ~26 jobs of each type. This demonstrated that a single $210 Aggregator can sustain 25 concurrent Listeners without falling behind, validating the architecture's scalability.\n\n" +
          "Power draw at full load was 6.1 W for combined upload and analysis — well within the solar budget for remote deployment. We also piloted the system at organic vineyards in Michigan, where it supported novel land-management techniques by delivering real-time bird activity data to field staff.",
      },
      {
        heading: "My Role",
        body:
          "I was co-first-author on the SC25 poster and split the work with Alex Tuecke. On the Listener side, I wrote the WAV streaming firmware (`wav-streamer`), the ESP32-P4 USB-AudioMoth integration (`esp32p4-usb-audiomoth`), the SPI infrastructure for the HaLow radio, and the ring-buffer architecture that keeps audio flowing through PSRAM under back-pressure.\n\n" +
          "On the research side, I helped design the evaluation methodology, ran the scalability tests, and co-authored the poster writup mini-paper."
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. FLEXDC-SIM — Peaclab research
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "flexdc-sim",
    title: "FlexDC-Sim",
    subtitle: "Data Center Flexibility Simulator for Grid-Scale Demand Response",
    summary:
      "A simulator for modeling how data centers can provide flexibility to the " +
      "electric grid. Research contributor at BU's Peaclab; submitted to ACM e-Energy 2026.",
    tags: [
      "Python",
      "Simulation",
      "Energy Systems",
      "Data Centers",
      "Research",
      "Grid Flexibility",
    ],
    //image: "/images/projects/flexdc-hero.jpg",
    image: "/images/projects/flexdc/FlexDCflow.png",
    gallery: [
      "/images/projects/flexdc-architecture.jpg",
      "/images/projects/flexdc-results.jpg",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/peaclab/flexdc-sim",
      },
      {
        label: "Paper (ACM e-Energy '26 submission)",
        href: "https://www.bu.edu/peaclab/files/2026/03/FlexDC_Sim_ACM_E_Energy26.pdf",
      },
      {
        label: "Peaclab",
        href: "https://www.bu.edu/peaclab/",
      },
    ],
    featured: true,
    year: "2025",
    role: "Undergraduate Research Contributor",
    sections: [
      {
        heading: "Overview",
        body:
          "FlexDC-Sim is a simulator developed at Boston University's Performance and Energy Aware Computing Lab (Peaclab, led by Prof. Ayse K. Coskun) for studying how data centers can participate in grid-scale demand response. As AI workloads push data-center power demand to unprecedented levels, the grid increasingly needs large, flexible loads that can shift consumption in response to price signals and renewable availability — and data centers are one of the few loads big enough to matter.\n\n" +
          "The simulator models a data center's internal job queue, cooling system, and power envelope together with an external grid signal, letting researchers evaluate policies that trade workload latency for load flexibility.",
      },
      {
        heading: "What I Contributed",
        body:
          "I worked on the simulator's cross-component integration and on validation experiments. The project sits at the intersection of systems research and energy-systems research, which means every component has to be believable to reviewers from both communities — a modeling shortcut that would be fine in one venue can sink the paper in the other.\n\n" +
          "My contributions fed into a paper submission to ACM e-Energy 2026, the premier venue for computing-and-energy-systems research. The work is part of a broader Peaclab program on data-center demand response that includes prior publications in IEEE Transactions on Sustainable Computing and ACM SIGEnergy Energy Informatics Review.",
      },
      {
        heading: "Why It Matters",
        body:
          "The motivation behind this work connects directly to my background in distributed-systems bug detection: both problems are about understanding what happens when complex, layered systems interact in ways their designers didn't fully anticipate. FlexDC-Sim gives researchers a testbed to study those interactions between the IT stack, the cooling stack, and the grid before committing to expensive deployments.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ME416 — Autonomous Robot Control
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "me416-robotics",
    title: "Autonomous Maze Navigation",
    subtitle: "ME416 Robot Control · LIMO + MoCap + EKF + LQR",
    summary:
      "An AgileX LIMO robot that autonomously navigates a maze using MoCap-based " +
      "localization, EKF state estimation, Dubins path planning, and LQR path following.",
    tags: [
      "Robotics",
      "MATLAB",
      "MQTT",
      "MoCap",
      "EKF",
      "LQR",
      "Path Planning",
      "ROS",
    ],
    //image: "/images/projects/me416-hero.jpg",
    image: "/images/projects/ME416/linefollowing_results.png",
    gallery: [
      "/images/projects/ME416/noiseKalman.png",
    ],
    links: [
      { label: "MoCap Visualizer",              href: "https://github.com/HudsonReynolds2/mocap_visualizer" },
      { label: "WiFi ESP Robot Driver",         href: "https://github.com/HudsonReynolds2/wifi_esp_robot_driver" },
      { label: "PC-side Robot Driver",          href: "https://github.com/HudsonReynolds2/wifi_pc_esp_robot_driver" },
      { label: "Camera Streamer",               href: "https://github.com/HudsonReynolds2/cameraStreamer" },
      { label: "Lab 1",                         href: "https://github.com/HudsonReynolds2/ME416_Lab1" },
      { label: "Lab 2",                         href: "https://github.com/HudsonReynolds2/ME416_Lab2_Turnin" },
      { label: "Mapper",                        href: "https://github.com/HudsonReynolds2/mapper" },
    ],
    featured: true,
    year: "2025",
    role: "Course Project · BU ME416",
    sections: [
      {
        heading: "Overview",
        body:
          "ME416 is BU's undergraduate robot control course. The semester-long project was to build up, layer by layer, an autonomous robot that could solve a randomized maze using only onboard sensing and a MoCap-provided ground-truth position.\n\n" +
          "The platform was an AgileX LIMO — a differential-drive rover with onboard compute. Control commands came from a PC over WiFi/MQTT; pose came from an OptiTrack motion-capture system; and everything was orchestrated in MATLAB and Python.",
      },
      {
        heading: "Stack",
        body:
          "The full control stack came together over several labs. Low-level drivers exposed the LIMO over MQTT so MATLAB could command wheel velocities. A MoCap bridge streamed 6-DoF pose into the same MQTT fabric. An Extended Kalman Filter fused wheel odometry with MoCap pose to produce a smooth, low-latency state estimate. A Dubins path planner generated minimum-curvature paths between the robot and its next waypoint, and a Linear Quadratic Regulator tracked those paths with tuned gain matrices.\n\n" +
          "For the final maze-solving project, the system layered a frontier-based exploration planner on top of the path-following stack, so the robot would drive to unexplored cells, observe walls via camera, and re-plan as it built up its map.",
      },
      {
        heading: "What I Built",
        body:
          "I wrote the MoCap visualizer (a real-time 3D viewer of the MoCap stream that we used for debugging pose issues), the WiFi ESP robot drivers (both PC-side and ESP-side), a camera streamer for remote observation, and the mapper that ties everything together for the final project.\n\n" +
          "The debugging experience was the real lesson. When the LQR controller would oscillate, the root cause could be in the EKF tuning, the MoCap latency, the MQTT buffering, or the path planner's curvature limits — and you had to diagnose it live, with a physical robot swerving across the lab floor. That kind of end-to-end debugging is directly applicable to the FrostByte and Echoes of Earth systems.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. EC522 — Computational Optical Imaging
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "ec522-computational-imaging",
    title: "Computational Optical Imaging",
    subtitle: "EC522 · Fourier Optics, Deconvolution, and Depth-from-Defocus",
    summary:
      "A semester of computational imaging: Fourier optics, PSFs, deconvolution, " +
      "and a final project recovering depth from defocused images.",
    tags: [
      "Python",
      "MATLAB",
      "Fourier Optics",
      "Deconvolution",
      "Signal Processing",
      "Jupyter",
    ],
    //image: "/images/projects/ec522-hero.jpg",
    image: "/images/projects/EC522/hw3sunset.png",
    gallery: [
      "/images/projects/EC522/psf.png",
      "/images/projects/EC522/noise.png",
      "/images/projects/EC522/tikhonov.png",
      "/images/projects/EC522/LPvsHPfiltering.png",
      "/images/projects/EC522/depthfromdefocus.png",
      "/images/projects/EC522/depthfromdefocuserror.png",
    ],
    links: [],
    featured: true,
    year: "2025",
    role: "Course Project · BU EC522",
    sections: [
      {
        heading: "Overview",
        body:
          "EC522 covers the mathematics and algorithms behind computational cameras: how the physical imaging system (lens, aperture, sensor) can be co-designed with the reconstruction" +
          " algorithm to capture information that traditional cameras simply can't. The course moves through Fourier transforms and convolution, into point-spread function (PSF) modeling," +
          " and culminates in deconvolution and depth recovery from optical cues.",
      },
      {
        heading: "Assignments",
        body:
          "Homework progressed from Fourier-domain intuition and 1D/2D convolution through PSF analysis, Wiener filtering, and inverse problems. Each assignment pushed the analysis deeper" + 
          " into practical numerical issues — noise amplification in deconvolution, boundary artifacts, conditioning of the forward operator — and most were implemented in both MATLAB and Python/Jupyter to compare environments.",
      },
      {
        heading: "Final Project: Depth from Defocus",
        body:
          "The final project was depth-from-defocus: recovering a scene's depth map from two images captured at different focus settings. The algorithm modeled each image as the scene" +
          " convolved with a depth-dependent PSF, then recovered depth by solving a per-pixel inverse problem that asks which PSF best explains the observed defocus.\n\n" +
          "The interesting part was the failure modes. Textureless regions have no defocus signal at all (any PSF fits), so the algorithm has to fall back to spatial regularization." +
          " High-contrast edges ring under deconvolution. The write-up covered these cases and the design choices that made the reconstruction robust.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. EC535 Embedded Systems: Dashmap
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "ec535-embedded-systems-dashmap",
    title: "Dashmap: Robot Dashboard for SLAM",
    subtitle: "EC535 · SLAM, ESP32 robot, Raspberry Pi, Live Dashboard, Docker",
    summary:
      "A semester of embedded systems: Building a < 10 MB Linux kernel, learning QEMU, " +
      "and a final project performing live SLAM with a custom ESP32 robot with a live dashboard.",
    tags: [
      "C/C++",
      "Assembly",
      "Linux",
      "QEMU",
      "Makefile",
      "BusyBox",
      "CRON",
      "Compiler Optimization",
    ],
    //image: "/images/projects/ec522-hero.jpg",
    image: "/images/projects/dashmap/Dashmap.png",
    gallery: [
      "/images/projects/dashmap/Dashmap.png",
      "/images/projects/dashmap/Dashmap_robot.png",
      "/images/projects/dashmap/Dashmap_slam3r.png",
    ],
    links: [],
    featured: true,
    year: "2025",
    role: "Course Project · BU EC535",
    sections: [
      {
        heading: "Overview",
        body:
          "EC535 covers embedded Linux from the ground up: how a minimal system is built, configured, and deployed on real hardware. The course works through cross-compilation toolchains, building" +
          " a sub-10 MB Linux kernel with custom configuration, BusyBox for a minimal userspace, and QEMU for emulation and testing. Topics also include init systems, CRON scheduling, and compiler" +
          " optimization strategies relevant to resource-constrained targets, and more.",
      },
      {
        heading: "Assignments",
        body:
          "Labs progressed from setting up a cross-compilation environment and booting a minimal kernel in QEMU through increasingly complex system configuration: trimming the kernel to under 10 MB," +
          " assembling a BusyBox-based rootfs, writing init scripts, and tuning compiler flags for size and performance. Each lab built directly on the last, reinforcing how each layer of the embedded" +
          " Linux stack depends on the one below it.",
      },
      {
        heading: "Final Project: Live SLAM with a Custom ESP32 Robot",
        body:
          "The final project was a fully autonomous robot built around an ESP32, performing live SLAM and streaming state to a real-time web dashboard. The robot handled sensor streaming and" +
          " motor control onboard while the dashboard visualized the evolving map and robot pose live, and a GPU rig performed the actual SLAM algorithm.\n\n" +
          "The interesting part was the integration surface. Getting SLAM to run reliably across multiple machines and someimtes firewalls meant careful caching and timing discipline, and the live dashboard added" +
          " a networking and serialization layer on top. The write-up covered the architecture decisions that kept latency low and the system stable across a full mapping run.",
      },
    ],
    
  },
{
    slug: "ec527-hpc-gpu",
    title: "HPC & GPU Programming",
    subtitle: "EC527 · HPC, CUDA, Optix, SIMD",
    summary:
      "A semester of high-performance programming labs, from SIMD and AVX2 Vector Processing to CUDA, " +
      "and a final project accelerating the smallpt raytracing demo using RTX cores and the Optix API.",
    tags: [
      "C/C++",
      "CUDA",
      "HPC",
      "SIMD",
      "Raytracing",
      "GPU",
    ],
    //image: "/images/projects/ec522-hero.jpg",
    image: "/images/projects/EC527/4096x3072_4096spp.png",
    gallery: [
      "/images/projects/EC527/comparison_small.jpg",
    ],
    links: [{ label: "smallpt-optix", href: "https://github.com/HudsonReynolds2/smallpt-optix" },],
    featured: true,
    year: "2026",
    role: "Course Project · BU EC527",
    sections: [
      {
        heading: "Overview",
        body:
          "EC527 is BU's high-performance computing course, covering the full stack of CPU and GPU optimization techniques. " +
          "Labs move from low-level CPU intrinsics through parallel programming models and into GPU architecture, with a structured " +
          "progression that builds intuition for where performance actually comes from on modern hardware. " +
          "The semester culminates in an open-ended final project targeting real GPU acceleration on a non-trivial workload.",
      },
      {
        heading: "Labs",
        body:
          "Lab work covered SIMD and AVX2 vector intrinsics for data-parallel CPU code, loop unrolling and cache-aware memory " +
          "access patterns, and an introduction to CUDA — kernels, thread/block hierarchy, shared memory, and occupancy tuning. " +
          "Later labs moved into more advanced GPU topics including memory coalescing, warp-level primitives, and profiling with " +
          "Nsight Compute to identify real bottlenecks rather than guessing.",
      },
      {
        heading: "Final Project: smallpt on RTX",
        body:
          "The final project took smallpt — the classic 99-line path tracer — and accelerated it using NVIDIA's OptiX 8 API on " +
          "a modern RTX GPU. The work was structured as a three-phase benchmark:\n\n" +
          "Phase 1 ported the renderer to a baseline CUDA kernel, replacing the CPU Monte Carlo loop with a massively parallel " +
          "per-pixel dispatch but keeping all intersection math in software on the shader cores.\n\n" +
          "Phase 2 integrated the OptiX pipeline — ray generation, closest-hit, miss, and any-hit shaders wired through an " +
          "acceleration structure — so that BVH traversal and ray-triangle intersection moved onto the RT cores. Walls became " +
          "triangle geometry and the three scene spheres used OptiX's built-in sphere primitive type, giving them hardware-accelerated " +
          "BVH traversal but still routing their intersection math through a software shader.\n\n" +
          "Phase 3 tessellated the spheres into triangle meshes, putting every primitive on the full RT-core path (hardware traversal " +
          "and hardware triangle intersection). This also required fixing floating-point precision artifacts — the original large wall " +
          "quads caused z-fighting between the ceiling geometry and the area light — addressed through wall tessellation. " +
          "The three-phase structure gives clean, apples-to-apples timing comparisons: software CUDA vs. partial RTX vs. fully RTX-accelerated.",
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────────────────
  // ── Below here: secondary projects (non-featured). They appear on the
  // ── /projects page but not the homepage. They can have short summaries
  // ── and no `sections` — the detail page just shows the summary and links.
  // ─────────────────────────────────────────────────────────────────────────

  {
    slug: "ec311-cpu",
    title: "EC311 Processor Design",
    subtitle: "Digital Logic and CPU Architecture",
    summary:
      "A working CPU designed from digital logic fundamentals for BU's EC311 course.",
    tags: ["Verilog", "Digital Logic", "CPU Design", "FPGA"],
    image: "/images/projects/EC311Logo.png",
    links: [
      { label: "GitHub", href: "https://github.com/HudsonReynolds2/Digital-Logic-2602" },
    ],
    year: "2024",
    role: "Course Project · BU EC311",
  },

  {
    slug: "esp-idf-spi",
    title: "ESP-IDF SPI Driver",
    summary:
      "Low-level SPI driver work for ESP32 platforms — infrastructure that underpins the Listener node.",
    tags: ["C", "ESP32", "SPI", "Embedded"],
    image: "/images/projects/ESP-IDF-SPILogo.png",
    links: [
      { label: "esp-idf-spi", href: "https://github.com/HudsonReynolds2/esp-idf-spi" },
      { label: "SPI",         href: "https://github.com/HudsonReynolds2/SPI" },
    ],
    year: "2024",
  },

  {
    slug: "pi-power-monitor",
    title: "Pi Power Monitor",
    summary: "A Raspberry Pi utility for monitoring system power draw.",
    tags: ["Python", "Raspberry Pi", "Monitoring"],
    image: "/images/projects/PiPowerLogo.png",
    links: [{ label: "GitHub", href: "https://github.com/HudsonReynolds2/pi_power_monitor" }],
  },

  {
    slug: "webblink",
    title: "WebBlink",
    summary: "Browser-controlled GPIO: blink LEDs with an FPGA through a web dashboard.",
    tags: ["Web", "GPIO", "FPGA", "ESP32"],
    image: "/images/projects/webBlinkLogo.png",
    links: [{ label: "GitHub", href: "https://github.com/HudsonReynolds2/WebBlink" }],
  },

  {
    slug: "spotify-custom-player",
    title: "Spotify Custom Player",
    summary: "A custom Spotify player UI built against the Web Playback SDK.",
    tags: ["JavaScript", "Web", "Spotify API"],
    image: "/images/projects/SpotifyCustomPlayerLogo.png",
    links: [{ label: "GitHub", href: "https://github.com/HudsonReynolds2/spotify-custom-player" }],
  },

  {
    slug: "esp32-ble-streaming",
    title: "ESP32 BLE Data Streaming",
    summary: "Streaming sensor data over Bluetooth Low Energy from an ESP32.",
    tags: ["C", "ESP32", "BLE", "Embedded"],
    image: "/images/projects/espbleLogo.png",
    links: [{ label: "GitHub", href: "https://github.com/HudsonReynolds2/esp32-BLE-for-data-streaming" }],
  },

  {
    slug: "sleep-tracker-ek210",
    title: "Sleep Tracking Wearable",
    subtitle: "EK210 Engineering Design",
    summary: "A wearable sleep-tracking device built for BU's EK210 intro design course. Inexpensive, easy to build, secure, and comfortable.",
    tags: ["Embedded", "Wearable", "Sensors"],
    image: "/images/projects/sleepTrackinglogo.png",
    links: [{ label: "GitHub", href: "https://github.com/HudsonReynolds2/Sleep-Tracking-Wearable-Device-EK210" }],
    year: "2023",
  },

  {
    slug: "id-finder",
    title: "ID Finder",
    summary: "A system for lost & found ID cards. Anrdoid app and backend database. Easily customizable, secure, scalable.",
    tags: ["Python", "Tooling"],
    image: "/images/projects/idFinderLogo.png",
    links: [{ label: "GitHub", href: "https://github.com/HudsonReynolds2/ID-Finder" }],
  },

  {
    slug: "shulker-box-finder",
    title: "Shulker Box Finder",
    summary: "Ever lost a shulker box somewhere in a minecraft world? This tool inspects the save folder and finds it for you!",
    tags: ["Java", "Minecraft", "Modding"],
    image: "/images/projects/shulkerboxfinderlogo.png",
    links: [{ label: "GitHub", href: "https://github.com/HudsonReynolds2/shulker_box_finder" }],
  },
];

// ----------------------------------------------------------------------------
// Helpers consumed by pages. Usually you don't edit these.
// ----------------------------------------------------------------------------

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects    = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
