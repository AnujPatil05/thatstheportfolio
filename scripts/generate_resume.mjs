import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors matching screenshot
  const navyColor = rgb(0.1, 0.28, 0.52); // #1a4785 - Section titles and name
  const textColor = rgb(0.12, 0.14, 0.17); // Almost black body text
  const linkColor = rgb(0.12, 0.45, 0.78); // Blue for links
  const grayColor = rgb(0.35, 0.38, 0.42); // Gray subheadings
  const dividerColor = rgb(0.1, 0.28, 0.52); // Blue-navy divider lines

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  // Helper function to wrap text
  function wrapText(text, font, size, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // ================= PAGE 1 =================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 38;

  // Name (Centered, Bold, Navy)
  const name = 'Anuj Patil';
  const nameSize = 20;
  const nameWidth = fontBold.widthOfTextAtSize(name, nameSize);
  page1.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y: y,
    size: nameSize,
    font: fontBold,
    color: navyColor,
  });
  y -= 16;

  // Contact info line 1
  const contactLine1 = '+91-8149544070 | anuj05patil@gmail.com | github.com/AnujPatil05 | linkedin.com/in/anujpatil | Navi Mumbai';
  const contact1Size = 8.5;
  const contact1Width = fontRegular.widthOfTextAtSize(contactLine1, contact1Size);
  page1.drawText(contactLine1, {
    x: (pageWidth - contact1Width) / 2,
    y: y,
    size: contact1Size,
    font: fontRegular,
    color: textColor,
  });
  y -= 12;

  // Portfolio link line 2
  const portfolioLink = 'anuj05portfolio.vercel.app';
  const portfolioWidth = fontRegular.widthOfTextAtSize(portfolioLink, contact1Size);
  page1.drawText(portfolioLink, {
    x: (pageWidth - portfolioWidth) / 2,
    y: y,
    size: contact1Size,
    font: fontRegular,
    color: linkColor,
  });
  y -= 14;

  // Helper for Section Headers
  function drawSectionHeader(page, title, currentY) {
    page.drawText(title, {
      x: margin,
      y: currentY,
      size: 11,
      font: fontBold,
      color: navyColor,
    });
    const headerHeight = 4;
    page.drawLine({
      start: { x: margin, y: currentY - headerHeight },
      end: { x: pageWidth - margin, y: currentY - headerHeight },
      thickness: 0.8,
      color: dividerColor,
    });
    return currentY - 14;
  }

  // Section: Summary
  y = drawSectionHeader(page1, 'Summary', y);
  const summaryText =
    'Full-stack engineer (B.Tech Information Technology, 2026) with production experience building Java/Spring Boot microservices at Codologs including an auth system and a Redis caching layer that cut p95 latency by ~70%. Building AI/LLM-powered systems end to end RAG retrieval, multi-stage AI agent pipelines, and applied LLM fine-tuning, shipped as production APIs. Comfortable owning a service from design through deployment, observability, and evaluation.';
  
  const summaryLines = wrapText(summaryText, fontRegular, 8.5, contentWidth);
  for (const line of summaryLines) {
    page1.drawText(line, { x: margin, y: y, size: 8.5, font: fontRegular, color: textColor });
    y -= 11.5;
  }
  y -= 4;

  // Section: Experience
  y = drawSectionHeader(page1, 'Experience', y);
  
  // Job header
  page1.drawText('Software Development Intern (Remote) | Codologs — Navi Mumbai / Remote | Jan 2026 – May 2026', {
    x: margin,
    y: y,
    size: 9,
    font: fontBold,
    color: textColor,
  });
  y -= 12;

  const expBullets = [
    'Built RESTful API modules for core business features in Spring Boot 3, shipped to production and consumed by downstream services within the same sprint.',
    'Delivered a JWT-based authentication microservice (token issuance, validation, revocation) as a standalone service used across backend modules.',
    'Cut p95 latency from ~320ms to ~95ms on high-frequency read endpoints by introducing Redis caching, eliminating redundant DB round-trips.',
    'Shipped 3 independently deployable microservices to production (auth, core business logic, supporting services), with error monitoring in place.',
  ];

  for (const bullet of expBullets) {
    const bulletLines = wrapText(bullet, fontRegular, 8.5, contentWidth - 14);
    page1.drawText('•', { x: margin + 2, y: y, size: 9, font: fontBold, color: textColor });
    for (let i = 0; i < bulletLines.length; i++) {
      page1.drawText(bulletLines[i], { x: margin + 14, y: y, size: 8.5, font: fontRegular, color: textColor });
      y -= 11;
    }
    y -= 1.5;
  }
  y -= 4;

  // Section: Education
  y = drawSectionHeader(page1, 'Education', y);
  page1.drawText('Bachelor of Technology — Information Technology', {
    x: margin,
    y: y,
    size: 9,
    font: fontBold,
    color: textColor,
  });
  const eduPeriod = '2022 – 2026';
  const eduPeriodWidth = fontRegular.widthOfTextAtSize(eduPeriod, 9);
  page1.drawText(eduPeriod, {
    x: pageWidth - margin - eduPeriodWidth,
    y: y,
    size: 9,
    font: fontRegular,
    color: textColor,
  });
  y -= 11.5;

  page1.drawText('Pillai College of Engineering, University of Mumbai · CGPA: 7.7 / 10.0', {
    x: margin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: grayColor,
  });
  y -= 14;

  // Section: Technical Skills
  y = drawSectionHeader(page1, 'Technical Skills', y);
  
  const skillItems = [
    { label: 'Default Skill :', val: ' CAN MAKE IT HAPPEN', isAccent: true },
    { label: 'Languages:', val: ' Java, Python, JavaScript, C' },
    { label: 'AI / ML:', val: ' LangChain, RAG, LoRA Fine Tuning , ChromaDB' },
    { label: 'Backend:', val: ' Spring Boot, FastAPI, REST API Design' },
    { label: 'Frontend:', val: ' React.js, HTML/CSS' },
    { label: 'Databases:', val: ' PostgreSQL (pgvector), MySQL, Redis' },
    { label: 'DevOps / Cloud:', val: ' Docker, GitHub Actions, AWS (S3, EC2 basics), Railway, Render' },
    { label: 'Tools:', val: ' Git, IntelliJ IDEA, VS Code, Claude Code, Jupyter Notebook, Postman, Sentry' },
    { label: 'Core CS:', val: ' Data Structures & Algorithms, OOP, System Design fundamentals' },
  ];

  for (const skill of skillItems) {
    page1.drawText(skill.label, { x: margin, y: y, size: 8.5, font: fontBold, color: textColor });
    const labelWidth = fontBold.widthOfTextAtSize(skill.label, 8.5);
    page1.drawText(skill.val, {
      x: margin + labelWidth,
      y: y,
      size: 8.5,
      font: skill.isAccent ? fontBold : fontRegular,
      color: skill.isAccent ? navyColor : textColor,
    });
    y -= 11.5;
  }
  y -= 4;

  // Section: Projects (Page 1)
  y = drawSectionHeader(page1, 'Projects', y);

  // Project 1: CodeEcoScan
  page1.drawText('CodeEcoScan', { x: margin, y: y, size: 9.5, font: fontBold, color: textColor });
  let proj1Offset = margin + fontBold.widthOfTextAtSize('CodeEcoScan', 9.5) + 6;
  page1.drawText('Lead Developer · ', { x: proj1Offset, y: y, size: 8.5, font: fontRegular, color: grayColor });
  proj1Offset += fontRegular.widthOfTextAtSize('Lead Developer · ', 8.5);
  page1.drawText('Live public API', { x: proj1Offset, y: y, size: 8.5, font: fontRegular, color: linkColor });
  y -= 12;

  const proj1Bullets = [
    'Engineered a static analysis tool that estimates energy risk and carbon footprint of Python workloads, scoring code across loop complexity, recursion depth, import weight, and I/O patterns using a custom AST-based engine.',
    'Architected a real-time carbon emissions estimator parameterised by hardware profile (Laptop / Cloud VM / GPU Server), runtime, and run frequency — converting energy draw to kgCO2/day.',
    'Deployed a live public API on Render serving analysis results in under 200ms for typical Python files; built a terminal-inspired React frontend with syntax-highlighted heatmap overlays and per-category score breakdowns.',
  ];

  for (const bullet of proj1Bullets) {
    const lines = wrapText(bullet, fontRegular, 8.2, contentWidth - 14);
    page1.drawText('•', { x: margin + 2, y: y, size: 8.5, font: fontBold, color: textColor });
    for (const l of lines) {
      page1.drawText(l, { x: margin + 14, y: y, size: 8.2, font: fontRegular, color: textColor });
      y -= 10.5;
    }
  }
  page1.drawText('Tech: Python (FastAPI), React.js, AST analysis, Render', {
    x: margin,
    y: y,
    size: 8,
    font: fontOblique,
    color: grayColor,
  });
  y -= 14;

  // Project 2: Agent Sentinel
  page1.drawText('Agent Sentinel', { x: margin, y: y, size: 9.5, font: fontBold, color: textColor });
  let proj2Offset = margin + fontBold.widthOfTextAtSize('Agent Sentinel', 9.5) + 6;
  page1.drawText('Lead Backend Engineer · Presented at Mumbai Hacks 2025', {
    x: proj2Offset,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: grayColor,
  });
  y -= 12;

  const proj2Bullets = [
    'Built an AI classification pipeline that processes viral claims end-to-end in under 4 seconds — extracting claims, retrieving evidence via GDELT, scoring with RoBERTa, and auto-publishing high-confidence verdicts while routing low-confidence results to a human review queue.',
    'Architected the multi-stage backend pipeline — claim extraction, GDELT-backed fact retrieval, RoBERTa classification, and structured verdict generation with confidence scores — designed for B2G and B2B misinformation monitoring use cases.',
    'Selected to present at Mumbai Hacks 2025 (December) — one of Maharashtra\'s largest hackathons — competing among 200+ teams as a 2-member team.',
  ];

  for (const bullet of proj2Bullets) {
    const lines = wrapText(bullet, fontRegular, 8.2, contentWidth - 14);
    page1.drawText('•', { x: margin + 2, y: y, size: 8.5, font: fontBold, color: textColor });
    for (const l of lines) {
      page1.drawText(l, { x: margin + 14, y: y, size: 8.2, font: fontRegular, color: textColor });
      y -= 10.5;
    }
  }
  page1.drawText('Tech: Python, FastAPI, HuggingFace Transformers (RoBERTa), GDELT API', {
    x: margin,
    y: y,
    size: 8,
    font: fontOblique,
    color: grayColor,
  });


  // ================= PAGE 2 =================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  y = pageHeight - 38;

  // Project 3: SmartDoc Query Engine
  page2.drawText('SmartDoc Query Engine', { x: margin, y: y, size: 9.5, font: fontBold, color: textColor });
  let proj3Offset = margin + fontBold.widthOfTextAtSize('SmartDoc Query Engine', 9.5) + 6;
  page2.drawText('Full-Stack Developer / DevOps ', { x: proj3Offset, y: y, size: 8.5, font: fontRegular, color: grayColor });
  proj3Offset += fontRegular.widthOfTextAtSize('Full-Stack Developer / DevOps ', 8.5);
  page2.drawText('LivePublicAPI', { x: proj3Offset, y: y, size: 8.5, font: fontRegular, color: linkColor });
  y -= 12;

  const proj3Bullets = [
    'Architected a RAG system for secure PDF querying using Docker Compose with isolated service containers, enabling independent restarts and fault containment per service — separating the API, embedding, and database layers.',
    'Implemented vectorised document storage with PostgreSQL (pgvector) and Redis-based caching + rate limiting, reducing redundant embedding calls by ~65% for repeat queries on previously-indexed documents.',
    'Added full observability via Sentry with structured logging of model performance and edge-case parsing failures.',
  ];

  for (const bullet of proj3Bullets) {
    const lines = wrapText(bullet, fontRegular, 8.2, contentWidth - 14);
    page2.drawText('•', { x: margin + 2, y: y, size: 8.5, font: fontBold, color: textColor });
    for (const l of lines) {
      page2.drawText(l, { x: margin + 14, y: y, size: 8.2, font: fontRegular, color: textColor });
      y -= 10.5;
    }
  }
  page2.drawText('Tech: Python (FastAPI), React.js (Vite), PostgreSQL (pgvector), Redis, Docker Compose, Sentence Transformers', {
    x: margin,
    y: y,
    size: 8,
    font: fontOblique,
    color: grayColor,
  });
  y -= 15;

  // Project 4: AI Tutor with Voice Cloning & Context-Managed Persona
  page2.drawText('AI Tutor with Voice Cloning & Context-Managed Persona', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: textColor,
  });
  let proj4Offset = margin + fontBold.widthOfTextAtSize('AI Tutor with Voice Cloning & Context-Managed Persona', 9.5) + 6;
  page2.drawText('Backend Developer (4-member team)', {
    x: proj4Offset,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: grayColor,
  });
  y -= 12;

  const proj4Bullets = [
    'Built a custom-trained AI tutor that answers course-specific questions while maintaining instructor tone and style through context-window-managed prompt injection and LoRA fine-tuning, evaluated on instructor-curated course question sets.',
    'Integrated voice cloning (XTTS) with RAG-based retrieval over ChromaDB, enabling the tutor to respond in the instructor\'s synthesised voice using LoRA fine-tuned models.',
  ];

  for (const bullet of proj4Bullets) {
    const lines = wrapText(bullet, fontRegular, 8.2, contentWidth - 14);
    page2.drawText('•', { x: margin + 2, y: y, size: 8.5, font: fontBold, color: textColor });
    for (const l of lines) {
      page2.drawText(l, { x: margin + 14, y: y, size: 8.2, font: fontRegular, color: textColor });
      y -= 10.5;
    }
  }
  page2.drawText('Tech: Python, FastAPI, Streamlit, RAG, LoRA Fine-Tuning, XTTS (Voice Cloning), ChromaDB, MLX', {
    x: margin,
    y: y,
    size: 8,
    font: fontOblique,
    color: grayColor,
  });
  y -= 15;

  // Project 5: Changelog-AI
  page2.drawText('Changelog-AI', { x: margin, y: y, size: 9.5, font: fontBold, color: textColor });
  let proj5Offset = margin + fontBold.widthOfTextAtSize('Changelog-AI', 9.5) + 6;
  page2.drawText('Live Public API', { x: proj5Offset, y: y, size: 8.5, font: fontRegular, color: linkColor });
  y -= 12;

  const proj5Bullets = [
    'Developed an end-to-end NLP pipeline using Gemini models and LangChain to transform raw GitHub commit metadata into structured, user-centric release notes automatically.',
    'Deployed backend on Railway with automatic restart configuration and Sentry observability to monitor runtime performance and capture edge-case parsing failures in real-time.',
  ];

  for (const bullet of proj5Bullets) {
    const lines = wrapText(bullet, fontRegular, 8.2, contentWidth - 14);
    page2.drawText('•', { x: margin + 2, y: y, size: 8.5, font: fontBold, color: textColor });
    for (const l of lines) {
      page2.drawText(l, { x: margin + 14, y: y, size: 8.2, font: fontRegular, color: textColor });
      y -= 10.5;
    }
  }
  page2.drawText('Tech: Python, LangChain, Gemini API, Railway, Sentry', {
    x: margin,
    y: y,
    size: 8,
    font: fontOblique,
    color: grayColor,
  });
  y -= 18;

  // Section: Hackathons & Achievements
  y = drawSectionHeader(page2, 'Hackathons & Achievements', y);

  // Achievement 1: Mumbai Hacks 2025
  page2.drawText('Mumbai Hacks 2025 — Participant', { x: margin, y: y, size: 9, font: fontBold, color: textColor });
  const ach1Date = 'December 2025';
  const ach1DateWidth = fontRegular.widthOfTextAtSize(ach1Date, 8.5);
  page2.drawText(ach1Date, {
    x: pageWidth - margin - ach1DateWidth,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 11.5;

  page2.drawText('Mumbai, Maharashtra', { x: margin, y: y, size: 8.5, font: fontRegular, color: grayColor });
  y -= 11.5;

  const ach1Bullet =
    'Participant | December 2025 Built and presented Agent Sentinel, an autonomous misinformation detection system, as a 2-member team at one of Maharashtra\'s largest annual hackathons.';
  const ach1Lines = wrapText(ach1Bullet, fontRegular, 8.2, contentWidth - 14);
  page2.drawText('•', { x: margin + 2, y: y, size: 8.5, font: fontBold, color: textColor });
  for (const l of ach1Lines) {
    page2.drawText(l, { x: margin + 14, y: y, size: 8.2, font: fontRegular, color: textColor });
    y -= 10.5;
  }
  y -= 5;

  // Achievement 2: Smart India Hackathon
  page2.drawText('Smart India Hackathon (SIH) — Internal Round Participant', {
    x: margin,
    y: y,
    size: 9,
    font: fontBold,
    color: textColor,
  });
  const ach2Date = '2025';
  const ach2DateWidth = fontRegular.widthOfTextAtSize(ach2Date, 8.5);
  page2.drawText(ach2Date, {
    x: pageWidth - margin - ach2DateWidth,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 11.5;

  page2.drawText('Pillai College of Engineering, New Panvel', { x: margin, y: y, size: 8.5, font: fontRegular, color: grayColor });
  y -= 11.5;

  const ach2Bullet = 'Cleared the internal college selection round.';
  page2.drawText('•', { x: margin + 2, y: y, size: 8.5, font: fontBold, color: textColor });
  page2.drawText(ach2Bullet, { x: margin + 14, y: y, size: 8.2, font: fontRegular, color: textColor });
  y -= 15.5;

  // Achievement 3: Hack4Innovation Hackathon
  page2.drawText('Hack4Innovation Hackathon — Selected Participant', {
    x: margin,
    y: y,
    size: 9,
    font: fontBold,
    color: textColor,
  });
  const ach3Date = 'March 2026';
  const ach3DateWidth = fontRegular.widthOfTextAtSize(ach3Date, 8.5);
  page2.drawText(ach3Date, {
    x: pageWidth - margin - ach3DateWidth,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 11.5;

  page2.drawText('Vivekanand Education Society\'s Institute Of Technology (VESIT), Mumbai', {
    x: margin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: grayColor,
  });
  y -= 11.5;

  const ach3Text =
    'Selected as a core member of Team Code Titans for a competitive hackathon hosted by Vivekanand Institute of Technology in collaboration with Rotary Club Mumbai — demonstrating analytical problem-solving and technical execution.';
  const ach3Lines = wrapText(ach3Text, fontRegular, 8.2, contentWidth);
  for (const l of ach3Lines) {
    page2.drawText(l, { x: margin, y: y, size: 8.2, font: fontRegular, color: textColor });
    y -= 10.5;
  }

  // Save to public/resume.pdf
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve(process.cwd(), 'public/resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Successfully wrote 2-page resume to', outputPath, `(${pdfBytes.length} bytes)`);
}

generateResume().catch(console.error);
