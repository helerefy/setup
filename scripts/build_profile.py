"""Build the downloadable VO profile from the 2025 company profile content.

Requires reportlab: python3 -m pip install reportlab==4.4.9
Run from any directory: python3 scripts/build_profile.py
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


OUTPUT = Path(__file__).resolve().parents[1] / "public/vo/VO-Technology-Profile.pdf"
W, H = A4
M = 51
INK = colors.HexColor("#151515")
ORANGE = colors.HexColor("#fe7141")
PAPER = colors.HexColor("#f7f6f4")
MUTED = colors.HexColor("#505050")
LINE = colors.HexColor("#d8d6d2")
WHITE = colors.white


def text(c, value, x, y, size=11, font="Helvetica", color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def paragraph(c, value, x, top, width, size=11, leading=16, color=INK, font="Helvetica"):
    style = ParagraphStyle(
        "copy", fontName=font, fontSize=size, leading=leading,
        textColor=color, alignment=TA_LEFT, spaceBefore=0, spaceAfter=0,
    )
    p = Paragraph(value, style)
    _, height = p.wrap(width, H)
    p.drawOn(c, x, top - height)
    return top - height


def rule(c, x, y, width, color=LINE, thickness=0.8):
    c.setStrokeColor(color)
    c.setLineWidth(thickness)
    c.line(x, y, x + width, y)


def base(c, number, section):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(ORANGE)
    c.rect(0, H - 8, W, 8, stroke=0, fill=1)
    text(c, "VO / TECHNOLOGY", M, H - 41, 10, "Helvetica-Bold")
    text(c, section.upper(), W - M - stringWidth(section.upper(), "Helvetica", 9), H - 41, 9, color=MUTED)
    rule(c, M, H - 56, W - 2 * M)
    rule(c, M, 48, W - 2 * M)
    text(c, "VO FOR TECHNOLOGY  /  COMPANY PROFILE", M, 29, 8, color=MUTED)
    text(c, f"{number:02d} / 06", W - M - 33, 29, 8, color=MUTED)


def heading(c, eyebrow, title, subtitle=None):
    text(c, eyebrow.upper(), M, 734, 9, "Helvetica-Bold", ORANGE)
    text(c, title, M, 682, 29, "Helvetica-Bold")
    if subtitle:
        paragraph(c, subtitle, M, 654, W - 2 * M, 11, 17, MUTED)


def item(c, x, y, width, index, title, body, tags=None):
    rule(c, x, y + 19, width)
    text(c, index, x, y - 6, 10, "Helvetica-Bold", ORANGE)
    text(c, title, x + 40, y - 8, 16, "Helvetica-Bold")
    bottom = paragraph(c, body, x + 40, y - 25, width - 40, 10.5, 15)
    if tags:
        paragraph(c, tags, x + 40, bottom - 9, width - 40, 9, 13, MUTED)


c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
c.setTitle("VO for Technology | Company Profile")
c.setAuthor("VO for Technology")
c.setSubject("Services, capabilities, products and organizations named in the 2025 company profile")

# 1: cover
c.setFillColor(PAPER)
c.rect(0, 0, W, H, stroke=0, fill=1)
c.setFillColor(ORANGE)
c.rect(0, 0, 13, H, stroke=0, fill=1)
text(c, "VO / TECHNOLOGY", M + 14, 774, 11, "Helvetica-Bold")
text(c, "COMPANY PROFILE", M + 14, 718, 10, "Helvetica-Bold", ORANGE)
rule(c, M + 14, 696, W - 2 * M - 14, INK, 1)
text(c, "VO for", M + 9, 575, 67, "Helvetica-Bold")
text(c, "Technology", M + 9, 501, 67, "Helvetica-Bold")
paragraph(
    c, "Software engineering, IT consulting, and data and AI capabilities for organizations across the Middle East and beyond.",
    M + 14, 427, 410, 16, 24, INK,
)
rule(c, M + 14, 310, W - 2 * M - 14)
for x, label, descriptor in [
    (M + 14, "01", "Engineering teams"),
    (M + 182, "02", "Business software"),
    (M + 350, "03", "Data and AI"),
]:
    text(c, label, x, 278, 10, "Helvetica-Bold", ORANGE)
    paragraph(c, descriptor, x, 260, 145, 11, 14, INK, "Helvetica-Bold")
text(c, "2025 CONTENT EDITION", M + 14, 159, 9, color=MUTED)
rule(c, M + 14, 142, W - 2 * M - 14, INK, 1)
text(c, "info@vo.technology", M + 14, 115, 10)
text(c, "+(966) 59 008 8250", M + 190, 115, 10)
text(c, "vo.technology", M + 14, 92, 10)
c.showPage()

# 2: company and services
base(c, 2, "Company and services")
heading(c, "The company", "What VO does", "VO combines IT consulting, software engineering, and data and AI work. Its 2025 profile describes three service areas.")
item(c, M, 583, W - 2 * M, "01", "Outsourcing", "Engineers and consultants can work within client teams or as dedicated engineering teams.", "Staff augmentation  /  Engineering teams  /  Consulting")
item(c, M, 461, W - 2 * M, "02", "Solutions and products", "Enterprise applications, CRM and ERP platforms, and mobile software.", ".NET Core  /  Node.js  /  Laravel  /  Creatio  /  Odoo  /  Mobile")
item(c, M, 339, W - 2 * M, "03", "Data analysis and AI", "Data systems, analytics, machine learning, and automation for operational and decision support.", "Machine learning  /  Predictive analytics  /  Automation")
rule(c, M, 209, W - 2 * M, INK)
text(c, "STATED VALUES", M, 187, 9, "Helvetica-Bold", ORANGE)
paragraph(c, "Innovation    /    Integrity    /    Agility    /    Partnership", M, 166, W - 2 * M, 13, 18, INK)
c.showPage()

# 3: AI and data
base(c, 3, "Data and AI")
heading(c, "Capabilities", "From data to decisions", "The profile identifies the following capabilities and deployment options. The four stages below reflect its stated workflow.")
left, right = M, M + 252
text(c, "CAPABILITIES", left, 595, 10, "Helvetica-Bold", ORANGE)
text(c, "DEPLOYMENT OPTIONS", right, 595, 10, "Helvetica-Bold", ORANGE)
for i, line in enumerate([
    "Predictive modeling",
    "Anomaly detection",
    "Natural language processing",
    "Computer vision",
    "Dashboards and reporting",
    "Recommendation engines",
]):
    y = 565 - i * 34
    text(c, line, left, y, 11)
    rule(c, left, y - 11, 216)
for i, line in enumerate([
    "Cloud-native and on-premise",
    "Hybrid environments",
    "API-first integration",
    "Machine learning pipelines",
    "Domain-specific model training",
]):
    y = 565 - i * 34
    text(c, line, right, y, 11)
    rule(c, right, y - 11, 216)
rule(c, M, 341, W - 2 * M, INK)
text(c, "WORKFLOW", M, 319, 10, "Helvetica-Bold", ORANGE)
for i, (name, detail) in enumerate([
    ("Data collection", "Structured and unstructured sources"),
    ("Data processing", ""),
    ("Machine learning and AI models", "Classification, regression, NLP and vision"),
    ("Insights and decision support", "Dashboards, reports and recommendations"),
]):
    y = 280 - i * 48
    text(c, f"0{i + 1}", M, y, 10, "Helvetica-Bold", ORANGE)
    text(c, name, M + 39, y, 12, "Helvetica-Bold")
    if detail:
        text(c, detail, M + 39, y - 16, 9, color=MUTED)
c.showPage()

# 4: sectors (application areas, not unverified project results)
base(c, 4, "Application areas")
heading(c, "Industry use cases", "Where the work applies", "The 2025 profile describes applications across government, finance, agriculture, retail, public services and large gatherings.")
sectors = [
    ("GOVERNMENT", "Smart city operations", "Dashboards for municipal resource management and urban planning."),
    ("FINANCE", "Risk and fraud detection", "Transaction-pattern analysis and anomaly detection for financial institutions."),
    ("AGRICULTURE", "Resource planning", "Water and crop planning using satellite data and predictive models."),
    ("RETAIL", "Demand forecasting", "Inventory and demand prediction for retail and logistics."),
    ("PUBLIC SECTOR", "Digital services", "Citizen-service platforms and cross-department workflows."),
    ("HAJJ", "Crowd and logistics", "Crowd analytics and logistics planning for mass gatherings."),
]
for i, (sector, title, body) in enumerate(sectors):
    col, row = i % 2, i // 2
    x, y = M + col * 252, 576 - row * 160
    rule(c, x, y + 21, 216)
    text(c, sector, x, y, 9, "Helvetica-Bold", ORANGE)
    paragraph(c, title, x, y - 14, 216, 16, 19, INK, "Helvetica-Bold")
    paragraph(c, body, x, y - 62, 216, 10.5, 15, MUTED)
text(c, "These application areas are not presented as verified project case studies.", M, 67, 8, color=MUTED)
c.showPage()

# 5: product names (the source does not supply product descriptions)
base(c, 5, "Products")
heading(c, "Portfolio", "Named products", "Eight products listed in VO's 2025 company profile.")
products = [
    "GeoBank",
    "Vehicle Tracking System",
    "PMO Cloud",
    "Correspondence Tracking and Management System",
    "Automotive Industry ERP (4SPlus)",
    "ISignage Pro",
    "Geo Sales Manager",
    "GEO ETL",
]
for i, product in enumerate(products):
    y = 583 - i * 63
    rule(c, M, y + 16, W - 2 * M)
    text(c, f"{i + 1:02d}", M, y - 5, 10, "Helvetica-Bold", ORANGE)
    paragraph(c, product, M + 43, y + 2, W - 2 * M - 45, 13, 16, INK, "Helvetica-Bold")
c.showPage()

# 6: organizations and contact, attributed to the original profile
base(c, 6, "Organizations and contact")
heading(c, "Listed in the 2025 profile", "Organizations & alliances", "Organizations and technology relationships named in the 2025 company profile.")
groups = [
    ("GOVERNMENT & PUBLIC SECTOR", [
        "Royal Commission for Riyadh", "Amanah Makkah Al-Mukarramah", "Amanah Al-Taif",
        "Kuwait Municipality", "Ministry of Hajj & Umrah", "Ministry of Interior",
        "Min. of Municipal Affairs", "Min. of Environment & Water", "KACST", "Central Bank of Libya",
    ]),
    ("ENTERPRISE & PRIVATE SECTOR", [
        "B.Tech", "Bin Dalbah Trading", "AlDahayan Trading", "Saleh Cars Group",
        "Three S", "AlHamidi Cars", "AlSharaf Cars", "Rotana Cars", "Class Cars", "Dagmal",
    ]),
]
for col, (label, names) in enumerate(groups):
    x = M + col * 252
    rule(c, x, 595, 216)
    text(c, label, x, 572, 8.4, "Helvetica-Bold", ORANGE)
    for i, name in enumerate(names):
        paragraph(c, name, x, 551 - i * 27, 216, 10, 13)
rule(c, M, 253, W - 2 * M, INK)
text(c, "RELATIONSHIPS NAMED IN THE PROFILE", M, 229, 9, "Helvetica-Bold", ORANGE)
paragraph(c, "SorsX  /  ITIDA  /  Egypt's Ministry of Communications &amp; Information Technology  /  Odoo  /  Creatio", M, 212, W - 2 * M, 10, 15)
rule(c, M, 151, W - 2 * M, INK)
text(c, "CONTACT", M, 131, 9, "Helvetica-Bold", ORANGE)
text(c, "info@vo.technology", M, 107, 11)
text(c, "+(966) 59 008 8250", M + 220, 107, 11)
text(c, "vo.technology", M, 84, 10)
c.showPage()

c.save()
print(f"Built {OUTPUT}")
