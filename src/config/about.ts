// ============================================================================
// ABOUT CONFIG
// ----------------------------------------------------------------------------
// Everything that goes on the /about page lives here.
// ============================================================================

export const about = {
  // Hero photo (drop a file at /public/images/about/headshot.jpg)
  photo: "/images/about/Headshot.jpg",
  photoAlt: "Hudson Reynolds",

  // Long-form bio, paragraphs separated by blank lines.
  bio: `I'm a Computer Engineering student at Boston University, graduating in May 2026. I build systems that bridge embedded hardware and distributed software — the kind of work that starts with a sensor on a breadboard and ends with a fleet of devices streaming into a cloud dashboard.

Most of my recent work has been in environmental and infrastructure sensing. At UChicago's BigDataX REU (Argonne National Laboratory), I co-developed a solar-powered bioacoustic monitoring system that scales to 25 concurrent recording nodes per aggregator — work that has been presented at SC24 and SC25. For my senior capstone, I lead FrostByte, a multi-sensor black-ice detection platform that fuses RGB, thermal, mmWave radar, and temperature data on a Raspberry Pi 5. On the research side, I've contributed to FlexDC-Sim at BU's Peaclab, a simulator for studying how data centers can provide grid-scale flexibility.

I'm targeting software engineering roles with a C/C++ focus, and I'm especially interested in work that sits close to hardware — embedded systems, edge computing, systems programming, distributed infrastructure. I'm relocating to San Diego after graduation.

Outside of school and research, I run a home lab (a dual-boot workstation named "enterprise," a couple of dedicated Linux boxes, and several Raspberry Pis) and host a NeoForge Minecraft server for friends. I like tinkering with the stack all the way down — which, it turns out, is also a good way to figure out where the next layer of a problem lives.`,

  // Education
  education: [
    {
      institution: "Boston University",
      degree: "B.S. Computer Engineering",
      date: "Expected May 2026",
      location: "Boston, MA",
      details:
        "Coursework emphasis: high-performance computing (CUDA, OpenMP, SIMD), ",
        "distributed systems, computational imaging, robot control, digital logic.",
    },
    {
      institution: "University of Chicago — BigDataX REU",
      degree: "Undergraduate Research",
      date: "Summer 2024, 2025",
      location: "Chicago, IL",
      details:
        "Bioacoustic monitoring system research under Mike Sherman (UChicago) and " +
        "Kate Keahey (Argonne National Laboratory). Presented at SC24 and SC25.",
    },
  ],

  // Publications & presentations
  publications: [
    {
      title: "Echoes of Earth: Building an Autonomous Environmental Lab for Acoustic Sensing",
      venue: "ACM SC25 Student Research Poster Competition",
      authors: "Hudson Reynolds, Alex Tuecke, Mike Sherman (advisor), Kate Keahey (advisor)",
      date: "November 2025",
      link: "https://sc25.supercomputing.org/proceedings/posters/poster_pages/post184.html",
    },
    {
      title: "FlexDC-Sim (co-author)",
      venue: "Submitted to ACM e-Energy 2026",
      authors: "Peaclab, Boston University",
      date: "March 2026",
      link: "https://www.bu.edu/peaclab/files/2026/03/FlexDC_Sim_ACM_E_Energy26.pdf",
    },
  ],

  // Skills, grouped. Each group becomes a section on /about.
  skills: [
    {
      group: "Languages",
      items: ["C", "C++", "Python", "MATLAB", "JavaScript/TypeScript", "Verilog", "Bash"],
    },
    {
      group: "Systems & Embedded",
      items: [
        "Linux",
        "balenaOS",
        "Docker",
        "FPGA",
        "Raspberry Pi",
        "ESP32 / ESP-IDF",
        "FreeRTOS",
        "UART / SPI / I2C",
        "USB",
      ],
    },
    {
      group: "Distributed & Cloud",
      items: [
        "Redis",
        "PostgreSQL",
        "Hadoop",
        "MinIO / S3",
        "WebSocket",
        "MQTT",
        "Chameleon Cloud",
        "Tailscale",
        "Prometheus / Grafana",
      ],
    },
    {
      group: "Signal & Data",
      items: [
        "CUDA",
        "OpenMP",
        "AVX / SIMD",
        "NumPy / SciPy",
        "PyTorch",
        "Fourier / Signal Processing",
        "Sensor Fusion",
      ],
    },
    {
      group: "Hardware",
      items: [
        "HDL: Verilog, Quartus, Xilinx for FPGA",
        "Soldering",
        "Oscilloscope, Power Supplies, Logic Analyzer",
        "CAD: OnShape, Fusion, Inventor, AutoCAD",
        "3D Printing",
        "CNC Machining",
        "Weatherproof prototypes",
        "Computer building",
        "Custom liquid cooling",
        "Overclocking",
        "RJ45 Wiring",
      ],
    },
  ],
};

export type AboutConfig = typeof about;
