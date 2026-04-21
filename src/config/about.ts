// ============================================================================
// ABOUT CONFIG
// ----------------------------------------------------------------------------
// Everything that goes on the /about page lives here.
// ============================================================================

export const about = {
  // Hero photo (drop a file at /public/images/about/headshot.jpg)
  photo: "/images/about/Headshot.JPG",
  photoAlt: "Hudson Reynolds",

  // Long-form bio, paragraphs separated by blank lines.
  bio: `I'm a Computer Engineering student at Boston University, graduating in May 2026. I build systems that bridge embedded hardware and distributed software — the kind of work that starts with a sensor on a breadboard and ends with a fleet of devices streaming into a cloud dashboard.

Most of my recent work has been in environmental and infrastructure sensing. At UChicago's BigDataX REU (Argonne National Laboratory), I co-developed a solar-powered bioacoustic monitoring system that scales to 25 concurrent recording nodes per aggregator — work that I presented SC25. For my senior capstone, I lead FrostByte, a multi-sensor black-ice detection platform that fuses RGB, thermal, mmWave radar, and temperature data on a Raspberry Pi 5. On the research side, I've contributed to FlexDC-Sim at BU's Peaclab, a simulator for studying how data centers can provide grid-scale flexibility.

I'm targeting software engineering roles, and I'm especially interested in work that sits close to hardware: embedded systems, edge computing, systems programming, distributed infrastructure. I'm relocating to San Diego after graduation.

Outside of school and research, I run a home lab (a dual-boot custom-built workstation, a couple of dedicated Linux machines, and several Raspberry Pis) and host a modded Minecraft server for friends. I also practice cycling, photography & videography, and I helped start the Boston University Gliding and Soaring club where students pursue pilots' licences, so I spend a lot of time at the hangar.`,

  // Education
  education: [
    {
      institution: "Boston University",
      degree: "B.S. Computer Engineering",
      date: "May 2026",
      location: "Boston, MA",
      details:
        "Coursework emphasis: high-performance computing, robotics, " +
        "full-stack at scale, embedded systems, computational imaging, digital logic.",
    },
    {
      institution: "University of Chicago & Illinois Institute of Technology: BigDataX REU",
      degree: "Undergraduate Research",
      date: "Summer 2025",
      location: "Chicago, IL",
      details:
        "Bioacoustic monitoring system research under Mike Sherman (UChicago) and " +
        "Kate Keahey (Argonne National Laboratory). Presented at SC25 in St. Louis.",
    },
    {
      institution: "University of Sydney",
      degree: "Study Abroad",
      date: "Jan-June 2024",
      location: "Sydney, NSW",
      details:
        "Web development with Livelo CEO Peter Barnes in the Sydney Startup Hub, " +
        "while studying CE and traveling, surfing, fishing, and practicing photography.",
    },
  ],

  // Publications & presentations
  publications: [
    {
      title: "Echoes of Earth: Building an Autonomous Environmental Lab for Acoustic Sensing",
      venue: "ACM SC25 Student Research Poster Competition",
      Lab: "Chameleon Cloud, University of Chicago & Argonne National Laboratory",
      authors: "Hudson Reynolds, Alex Tuecke, Mike Sherman (advisor), Kate Keahey (advisor)",
      date: "November 2025",
      link: "https://sc25.supercomputing.org/proceedings/posters/poster_pages/post184.html",
    },
    {
      title: "FlexDC-Sim",
      venue: "ACM e-Energy 2026",
      Lab: "Performance and Energy Aware Computing Laboratory (PEACLab), Boston University",
      authors: "Fatih Acun, Can Hankendi, Ethan Levine, Hudson Reynolds, Joshua Bardwick, Ayse Coskun (Advisor)",
      date: "March 2026",
      link: "https://www.bu.edu/peaclab/files/2026/03/FlexDC_Sim_ACM_E_Energy26.pdf",
    },
  ],

  // Skills, grouped. Each group becomes a section on /about.
  skills: [
    {
      group: "Languages",
      items: ["C", "C++", "Assembly", "Verilog", "Python", "MATLAB", "JavaScript/TypeScript", "Bash"],
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
        "QEMU, BusyBox, CRON",
        "Makefiles & CMAKE"
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
