import json
import os
import sys
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, KeepTogether, FrameBreak

data_dir, public_dir = sys.argv[1:]
with open(os.path.join(data_dir, 'cv-copy.json'), encoding='utf-8') as file:
    copies = json.load(file)

INK = colors.HexColor('#172b36')
MUTED = colors.HexColor('#53616c')
TEAL = colors.HexColor('#0f766e')
PALE = colors.HexColor('#f0f5f4')
PAGE_W, PAGE_H = A4
SHEET = getSampleStyleSheet()
styles = {
    'name': ParagraphStyle('name', parent=SHEET['Title'], fontName='Helvetica-Bold', fontSize=22, leading=25, textColor=INK, alignment=TA_LEFT, spaceAfter=2),
    'role': ParagraphStyle('role', parent=SHEET['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=TEAL, spaceAfter=3),
    'contact': ParagraphStyle('contact', parent=SHEET['Normal'], fontSize=7, leading=9, textColor=MUTED),
    'section': ParagraphStyle('section', parent=SHEET['Heading2'], fontName='Helvetica-Bold', fontSize=8.3, leading=10, textColor=TEAL, spaceBefore=5, spaceAfter=4, keepWithNext=True),
    'body': ParagraphStyle('body', parent=SHEET['BodyText'], fontSize=8, leading=10, textColor=INK, spaceAfter=3),
    'lead': ParagraphStyle('lead', parent=SHEET['BodyText'], fontSize=8.3, leading=11, textColor=INK, spaceAfter=4),
    'job': ParagraphStyle('job', parent=SHEET['BodyText'], fontName='Helvetica-Bold', fontSize=8.1, leading=10, textColor=INK, spaceBefore=2, spaceAfter=1, keepWithNext=True),
    'meta': ParagraphStyle('meta', parent=SHEET['BodyText'], fontSize=7, leading=8.5, textColor=MUTED, spaceAfter=2),
    'small': ParagraphStyle('small', parent=SHEET['BodyText'], fontSize=7.1, leading=9, textColor=MUTED, spaceAfter=3),
    'links': ParagraphStyle('links', parent=SHEET['BodyText'], fontSize=6.6, leading=8, textColor=TEAL, spaceAfter=4),
    'bullet': ParagraphStyle('bullet', parent=SHEET['BodyText'], fontSize=7.8, leading=9.5, leftIndent=9, firstLineIndent=-6, bulletIndent=0, textColor=INK, spaceAfter=1.5),
}

def safe(text):
    return str(text).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def section(title):
    return Paragraph(safe(title.upper()), styles['section'])

def make_project(title, description, links):
    return [KeepTogether([Paragraph(safe(title), styles['job']), Paragraph(safe(description), styles['body']), Paragraph(links, styles['links'])])]

def links_for(c, idx):
    links = [
        ('Demo Dr. Agramonte' if c['language'] == 'es' else 'Dr. Agramonte demo', 'https://maragramonte.github.io/dr-agramonte/'),
        ('Código' if c['language'] == 'es' else 'Code', 'https://github.com/maragramonte/dr-agramonte'),
        ('Web Farmàcia Agramonte' if c['language'] == 'es' else 'Farmàcia Agramonte website', 'https://maragramonte.github.io/Farmacia-Agramonte/'),
        ('Código' if c['language'] == 'es' else 'Code', 'https://github.com/maragramonte/Farmacia-Agramonte'),
    ][idx*2:idx*2+2]
    return ' &nbsp;·&nbsp; '.join(f'<link href="{url}" color="#0f766e">{label}</link>' for label, url in links)

def header(canvas, doc, c, visual):
    canvas.saveState()
    if visual:
        canvas.setFillColor(PALE)
        canvas.rect(132*mm, 13*mm, 63*mm, PAGE_H-62*mm, fill=1, stroke=0)
        canvas.setFillColor(INK)
        canvas.rect(13*mm, PAGE_H-43*mm, PAGE_W-26*mm, 34*mm, fill=1, stroke=0)
        canvas.setFillColor(colors.HexColor('#73d6c9'))
        canvas.setFont('Helvetica-Bold', 8)
        canvas.drawString(18*mm, PAGE_H-16*mm, c['role'].upper())
        canvas.setFillColor(colors.white)
        canvas.setFont('Helvetica-Bold', 23)
        canvas.drawString(18*mm, PAGE_H-27*mm, c['title'])
        canvas.setFillColor(colors.HexColor('#d1e0e2'))
        canvas.setFont('Helvetica', 6.6)
        canvas.drawString(18*mm, PAGE_H-35*mm, c['contact'])
    else:
        canvas.setStrokeColor(TEAL)
        canvas.setLineWidth(1.7)
        canvas.line(15*mm, PAGE_H-34*mm, PAGE_W-15*mm, PAGE_H-34*mm)
        canvas.setFillColor(TEAL)
        canvas.setFont('Helvetica-Bold', 8)
        canvas.drawString(15*mm, PAGE_H-17*mm, c['role'].upper())
        canvas.setFillColor(INK)
        canvas.setFont('Helvetica-Bold', 22)
        canvas.drawString(15*mm, PAGE_H-28*mm, c['title'])
        canvas.setFillColor(MUTED)
        canvas.setFont('Helvetica', 6.8)
        canvas.drawString(15*mm, PAGE_H-32*mm, c['contact'])
    canvas.restoreState()

def document(path, c, visual=False):
    doc = BaseDocTemplate(path, pagesize=A4, leftMargin=15*mm, rightMargin=15*mm, topMargin=(48 if visual else 40)*mm, bottomMargin=13*mm, title=f"{c['title']} — CV", author=c['title'])
    if visual:
        left = Frame(15*mm, 13*mm, 112*mm, PAGE_H-62*mm, leftPadding=0, rightPadding=4*mm, topPadding=0, bottomPadding=0, id='left')
        right = Frame(132*mm, 13*mm, 63*mm, PAGE_H-62*mm, leftPadding=4*mm, rightPadding=2*mm, topPadding=0, bottomPadding=0, id='right')
        doc.addPageTemplates(PageTemplate(id='visual', frames=[left,right], onPage=lambda canvas, d: header(canvas,d,c,True)))
        left_story = [section(c['profileTitle']), Paragraph(safe(c['profile']), styles['lead']), section(c['projects'])]
        left_story += make_project(c['drTitle'], c['visualProjectDr'], links_for(c,0))
        left_story += make_project(c['pharmacyTitle'], c['visualProjectPharmacy'], links_for(c,1))
        left_story += [section(c['experience']), Paragraph(safe(c['marlink']),styles['job']),Paragraph(safe(c['marlinkMeta']),styles['meta'])]
        left_story += [Paragraph('• '+safe(item),styles['bullet']) for item in c['marlinkBullets'][:3]]
        left_story += [Paragraph(safe(c['glad']),styles['job']),Paragraph(safe(c['gladMeta']),styles['meta']),Paragraph(safe(c['gladText']),styles['small'])]
        right_story = [section(c['skills']), Paragraph(safe(c['skillsText'].replace(' · ', '  |  ')),styles['small']), section(c['education']),Paragraph(c['educationText'],styles['small']),section(c['languages']),Paragraph(safe(c['languagesText']),styles['small']),Spacer(1,4*mm),Paragraph(safe(c['otherText']),styles['small'])]
        doc.build(left_story + [FrameBreak()] + right_story)
    else:
        frame = Frame(15*mm,13*mm,PAGE_W-30*mm,PAGE_H-55*mm,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0,id='ats')
        doc.addPageTemplates(PageTemplate(id='ats',frames=[frame],onPage=lambda canvas,d:header(canvas,d,c,False)))
        story=[section(c['profileTitle']),Paragraph(safe(c['profile']),styles['body']),section(c['experience'])]
        story += [Paragraph(safe(c['marlink']),styles['job']),Paragraph(safe(c['marlinkMeta']),styles['meta'])]
        story += [Paragraph('• '+safe(item),styles['bullet']) for item in c['marlinkBullets']]
        story += [Paragraph(safe(c['glad']),styles['job']),Paragraph(safe(c['gladMeta']),styles['meta']),Paragraph(safe(c['gladText']),styles['body']),section(c['projects'])]
        story += make_project(c['drTitle'],c['dr'],links_for(c,0))
        story += make_project(c['pharmacyTitle'],c['pharmacy'],links_for(c,1))
        story += [section(c['skills']),Paragraph(safe(c['skillsText']),styles['body']),section(c['education']),Paragraph(c['educationText'],styles['body']),section(c['other']),Paragraph(safe(c['otherText']),styles['body']),section(c['languages']),Paragraph(safe(c['languagesText']),styles['body'])]
        doc.build(story)

for locale, c in copies.items():
    document(os.path.join(public_dir, f'cv-mar-agramonte-{locale}.pdf'),c,visual=True)
    document(os.path.join(public_dir, f'cv-mar-agramonte-{locale}-ats.pdf'),c,visual=False)
