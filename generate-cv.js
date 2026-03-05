const {
    Document, Packer, Paragraph, TextRun, HeadingLevel,
    AlignmentType, BorderStyle, TabStopPosition, TabStopType,
    ShadingType, Table, TableRow, TableCell, WidthType, TableBorders,
    VerticalAlign, convertInchesToTwip, ImageRun, Footer, Header,
    PageBreak, ExternalHyperlink
} = require("docx");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// ============================================================
// COLOR PALETTE
// ============================================================
const COLORS = {
    accentBlue: "0071E3",
    accentCyan: "64D2FF",
    darkText: "1D1D1F",
    bodyText: "333333",
    mutedText: "777777",
    lightMuted: "999999",
    white: "FFFFFF",
    lightGray: "F5F5F7",
    medGray: "E5E5EA",
    purple: "BF5AF2",
    green: "30D158",
    orange: "FF9F0A",
    pink: "FF375F",
    barBg: "E8E8ED",
};

// ============================================================
// HELPER: Create a horizontal rule paragraph
// ============================================================
function horizontalRule() {
    return new Paragraph({
        border: {
            bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.medGray },
        },
        spacing: { before: 100, after: 200 },
    });
}

// ============================================================
// HELPER: Section heading (e.g., "WORK EXPERIENCE")
// ============================================================
function sectionHeading(icon, title) {
    return new Paragraph({
        spacing: { before: 360, after: 120 },
        border: {
            bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.medGray },
        },
        children: [
            new TextRun({
                text: `${icon}  `,
                size: 20,
            }),
            new TextRun({
                text: title.toUpperCase(),
                bold: true,
                size: 18,
                color: COLORS.accentBlue,
                font: "Calibri",
                characterSpacing: 120,
            }),
        ],
    });
}

// ============================================================
// HELPER: Experience entry
// ============================================================
function experienceEntry(role, company, date, bullets) {
    const paragraphs = [];

    // Role + Date on same line
    paragraphs.push(
        new Paragraph({
            spacing: { before: 200, after: 40 },
            children: [
                new TextRun({
                    text: role,
                    bold: true,
                    size: 22,
                    color: COLORS.darkText,
                    font: "Calibri",
                }),
                new TextRun({
                    text: `    ${date}`,
                    bold: true,
                    size: 16,
                    color: COLORS.accentBlue,
                    font: "Calibri",
                }),
            ],
        })
    );

    // Company
    paragraphs.push(
        new Paragraph({
            spacing: { after: 80 },
            children: [
                new TextRun({
                    text: company,
                    italics: true,
                    size: 18,
                    color: COLORS.mutedText,
                    font: "Calibri",
                }),
            ],
        })
    );

    // Bullet points
    for (const bullet of bullets) {
        paragraphs.push(
            new Paragraph({
                spacing: { after: 40 },
                indent: { left: convertInchesToTwip(0.25) },
                children: [
                    new TextRun({
                        text: "▸ ",
                        size: 16,
                        color: COLORS.accentBlue,
                        font: "Calibri",
                    }),
                    new TextRun({
                        text: bullet,
                        size: 18,
                        color: COLORS.bodyText,
                        font: "Calibri",
                    }),
                ],
            })
        );
    }

    return paragraphs;
}

// ============================================================
// HELPER: Skill bar as text representation
// ============================================================
function skillBar(name, percentage, color = COLORS.accentBlue) {
    const filled = Math.round(percentage / 5);
    const empty = 20 - filled;
    const bar = "█".repeat(filled) + "░".repeat(empty);

    return new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [
            new TextRun({
                text: name,
                bold: true,
                size: 17,
                color: COLORS.darkText,
                font: "Calibri",
            }),
            new TextRun({
                text: `  ${percentage}%`,
                bold: true,
                size: 15,
                color: color,
                font: "Calibri",
            }),
            new TextRun({
                text: "\n",
                break: 1
            }),
            new TextRun({
                text: bar,
                size: 11,
                color: color,
                font: "Consolas",
            }),
        ],
    });
}

// ============================================================
// HELPER: Tag/chip as text
// ============================================================
function tagList(tags) {
    return new Paragraph({
        spacing: { before: 60, after: 60 },
        children: tags.flatMap((tag, i) => {
            const runs = [
                new TextRun({
                    text: ` ${tag} `,
                    size: 16,
                    color: COLORS.darkText,
                    font: "Calibri",
                    shading: { type: ShadingType.CLEAR, fill: COLORS.lightGray },
                }),
            ];
            if (i < tags.length - 1) {
                runs.push(new TextRun({ text: "  ", size: 16 }));
            }
            return runs;
        }),
    });
}

// ============================================================
// HELPER: Certification entry
// ============================================================
function certEntry(name, issuer) {
    return new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [
            new TextRun({
                text: "●  ",
                size: 10,
                color: COLORS.accentBlue,
                font: "Calibri",
            }),
            new TextRun({
                text: name,
                bold: true,
                size: 18,
                color: COLORS.darkText,
                font: "Calibri",
            }),
            new TextRun({
                text: `  —  ${issuer}`,
                size: 16,
                color: COLORS.lightMuted,
                font: "Calibri",
            }),
        ],
    });
}

// ============================================================
// HELPER: Reference entry
// ============================================================
function referenceEntry(quote, name, title) {
    return [
        new Paragraph({
            spacing: { before: 120, after: 40 },
            children: [
                new TextRun({
                    text: `"${quote}"`,
                    italics: true,
                    size: 18,
                    color: COLORS.bodyText,
                    font: "Calibri",
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 120 },
            children: [
                new TextRun({
                    text: `— ${name}`,
                    bold: true,
                    size: 17,
                    color: COLORS.darkText,
                    font: "Calibri",
                }),
                new TextRun({
                    text: `, ${title}`,
                    size: 16,
                    color: COLORS.mutedText,
                    font: "Calibri",
                }),
            ],
        }),
    ];
}

// ============================================================
// BUILD THE DOCUMENT
// ============================================================
async function buildCV() {
    console.log("🔨 Building CV document...");

    const doc = new Document({
        creator: "Aiyedun Samuel Oluwadamilola",
        title: "CV — Aiyedun Samuel Oluwadamilola (Samsco)",
        description: "Curriculum Vitae of Aiyedun Samuel",
        styles: {
            default: {
                document: {
                    run: {
                        font: "Calibri",
                        size: 20,
                        color: COLORS.bodyText,
                    },
                    paragraph: {
                        spacing: { line: 276 },
                    },
                },
            },
        },
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: convertInchesToTwip(0.7),
                            bottom: convertInchesToTwip(0.6),
                            left: convertInchesToTwip(0.8),
                            right: convertInchesToTwip(0.8),
                        },
                    },
                },
                footers: {
                    default: new Footer({
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "© 2026 Aiyedun Samuel Oluwadamilola (Samsco)  •  samscocommunications@gmail.com  •  +234 907 248 3594",
                                        size: 14,
                                        color: COLORS.lightMuted,
                                        font: "Calibri",
                                    }),
                                ],
                            }),
                        ],
                    }),
                },
                children: [
                    // ===== NAME =====
                    new Paragraph({
                        spacing: { after: 40 },
                        children: [
                            new TextRun({
                                text: "AIYEDUN SAMUEL ",
                                bold: true,
                                size: 40,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "OLUWADAMILOLA",
                                bold: true,
                                size: 40,
                                color: COLORS.accentBlue,
                                font: "Calibri",
                            }),
                        ],
                    }),

                    // ===== TITLE =====
                    new Paragraph({
                        spacing: { after: 120 },
                        children: [
                            new TextRun({
                                text: "Creative Technologist  •  3D Designer  •  Media Strategist",
                                size: 22,
                                color: COLORS.accentBlue,
                                font: "Calibri",
                            }),
                        ],
                    }),

                    // ===== CONTACT ROW =====
                    new Paragraph({
                        spacing: { after: 40 },
                        children: [
                            new TextRun({ text: "✉  ", size: 16, color: COLORS.accentBlue }),
                            new TextRun({
                                text: "samscocommunications@gmail.com",
                                size: 17,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                            new TextRun({ text: "      ", size: 17 }),
                            new TextRun({ text: "📞  ", size: 16, color: COLORS.green }),
                            new TextRun({
                                text: "+234 907 248 3594",
                                size: 17,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                            new TextRun({ text: "      ", size: 17 }),
                            new TextRun({ text: "📍  ", size: 16, color: COLORS.pink }),
                            new TextRun({
                                text: "Lagos, Nigeria",
                                size: 17,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: 60 },
                        children: [
                            new TextRun({ text: "🔗  ", size: 16, color: COLORS.accentBlue }),
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: "linkedin.com/in/samsco",
                                        size: 17,
                                        color: COLORS.accentBlue,
                                        font: "Calibri",
                                        underline: {},
                                    }),
                                ],
                                link: "https://linkedin.com/in/samsco",
                            }),
                            new TextRun({ text: "      ", size: 17 }),
                            new TextRun({ text: "🌐  ", size: 16, color: COLORS.purple }),
                            new TextRun({
                                text: "Portfolio Website",
                                size: 17,
                                color: COLORS.purple,
                                font: "Calibri",
                            }),
                        ],
                    }),

                    horizontalRule(),

                    // ===== PROFILE SUMMARY =====
                    sectionHeading("👤", "Profile"),
                    new Paragraph({
                        spacing: { after: 40 },
                        children: [
                            new TextRun({
                                text: "A multifaceted ",
                                size: 19,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "Creative Professional",
                                bold: true,
                                size: 19,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: " and final-year ",
                                size: 19,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "Mass Communication",
                                bold: true,
                                size: 19,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: " student at ",
                                size: 19,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "Covenant University",
                                bold: true,
                                size: 19,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: ", passionate about bridging ",
                                size: 19,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "SDG 4 (Quality Education)",
                                bold: true,
                                size: 19,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: " and entrepreneurship. Specializing in ",
                                size: 19,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "3D Design, Visual Effects, Video Production, and Content Strategy",
                                bold: true,
                                size: 19,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: ". Proven track record delivering ",
                                size: 19,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "50+ projects",
                                bold: true,
                                size: 19,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: " across freelance, academic, and professional settings. Known for a unique blend of creative skills and strategic thinking — equally comfortable in the creative trenches and leading cross-functional teams.",
                                size: 19,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                        ],
                    }),

                    // ===== WORK EXPERIENCE =====
                    sectionHeading("💼", "Work Experience"),
                    ...experienceEntry(
                        "Media Specialist",
                        "Olive Media",
                        "2024 — Present",
                        [
                            "Driving media strategy and content production for diverse client campaigns.",
                            "Collaborating with cross-functional teams to deliver high-impact digital campaigns.",
                            "Creating 3D product visualizations and motion graphics for brand storytelling.",
                        ]
                    ),
                    ...experienceEntry(
                        "Creative Head",
                        "CUCSA — Covenant University Comm Students Association",
                        "2025 — Present",
                        [
                            "Lead creative direction for student association branding and events.",
                            "Oversee design output, visual communication strategies, and multimedia content.",
                        ]
                    ),
                    ...experienceEntry(
                        "Media Strategist",
                        "Ark Media",
                        "2024",
                        [
                            "Contributed to media planning and creative execution for brand clients.",
                            "Executed brand positioning strategies and visual identity systems.",
                        ]
                    ),
                    ...experienceEntry(
                        "Media Specialist Intern",
                        "Modion Communications",
                        "Summer 2024",
                        [
                            "Delivered over 50+ high-quality designs for client campaigns.",
                            "Assisted in media planning, content creation strategies, and visual asset production.",
                        ]
                    ),
                    ...experienceEntry(
                        "Freelance 3D Artist & Designer",
                        "Self-employed",
                        "2020 — Present",
                        [
                            "Product visualization, brand asset creation, and motion graphics for various clients.",
                            "Created futuristic, interactive experiences using Blender, After Effects, and code.",
                        ]
                    ),

                    // ===== EDUCATION =====
                    sectionHeading("🎓", "Education"),
                    new Paragraph({
                        spacing: { before: 160, after: 40 },
                        children: [
                            new TextRun({
                                text: "B.Sc. Mass Communication",
                                bold: true,
                                size: 22,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: 40 },
                        children: [
                            new TextRun({
                                text: "Covenant University, Nigeria",
                                size: 19,
                                color: COLORS.accentBlue,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "    2022 — 2026 (Expected)",
                                size: 16,
                                color: COLORS.lightMuted,
                                font: "Calibri",
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: 60 },
                        children: [
                            new TextRun({
                                text: "Combining theoretical knowledge of communication with practical application in digital media and technology. Active member of Hult Prize and departmental leadership.",
                                size: 18,
                                color: COLORS.bodyText,
                                font: "Calibri",
                            }),
                        ],
                    }),

                    // ===== TECHNICAL SKILLS =====
                    sectionHeading("🛠️", "Technical Skills"),
                    skillBar("Blender / 3D Modeling", 95, COLORS.accentBlue),
                    skillBar("Adobe Suite (Ps, Ai, Pr)", 90, COLORS.purple),
                    skillBar("Motion Graphics / VFX", 88, COLORS.pink),
                    skillBar("Python / Data Analytics", 80, COLORS.orange),
                    skillBar("JavaScript / Web Dev", 60, COLORS.green),

                    // ===== CORE COMPETENCIES =====
                    sectionHeading("⭐", "Core Competencies"),
                    tagList([
                        "3D Design & VFX", "Video Production", "Prompt Engineering",
                        "Content Strategy", "Public Speaking",
                    ]),
                    tagList([
                        "Graphic Design", "Data Analytics", "AI Automation",
                        "LinkedIn Marketing", "Creative Coding",
                    ]),

                    // ===== CERTIFICATIONS =====
                    sectionHeading("📜", "Certifications"),
                    certEntry("LinkedIn Marketing Solutions", "LinkedIn · Oct 2024"),
                    certEntry("Online Marketing Certified Associate (OMCA)", "Great Learning · Oct 2024"),
                    certEntry("Prompt Engineering", "OBTranslate · Feb 2024"),
                    certEntry("Certified Speaking Professional", "Strictly Speaking · Jun 2023"),

                    // ===== LANGUAGES =====
                    sectionHeading("🌍", "Languages"),
                    new Paragraph({
                        spacing: { before: 80, after: 80 },
                        children: [
                            new TextRun({
                                text: "English",
                                bold: true,
                                size: 19,
                                color: COLORS.darkText,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: "  —  Native / Bilingual Proficiency",
                                size: 18,
                                color: COLORS.mutedText,
                                font: "Calibri",
                            }),
                        ],
                    }),

                    // ===== REFERENCES =====
                    sectionHeading("💬", "References"),
                    ...referenceEntry(
                        "Samuel is the best graphics designer in the whole of Mass Communication at Covenant University.",
                        "Dr. Tunji Oyedepo",
                        "Faculty, Covenant University"
                    ),
                    ...referenceEntry(
                        "Possesses exceptional technical proficiency and a deep understanding of modern digital tools.",
                        "Dr. Tolu",
                        "Faculty, High Impact"
                    ),
                ],
            },
        ],
    });

    // Generate the .docx buffer
    const buffer = await Packer.toBuffer(doc);

    // Save to file
    const outputPath = path.join(__dirname, "Aiyedun_Samuel_CV.docx");
    fs.writeFileSync(outputPath, buffer);

    console.log(`\n✅ CV successfully generated!`);
    console.log(`📄 File: ${outputPath}`);
    console.log(`📦 Size: ${(buffer.length / 1024).toFixed(1)} KB`);
}

buildCV().catch((err) => {
    console.error("❌ Error generating CV:", err);
    process.exit(1);
});
