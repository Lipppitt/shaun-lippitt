---
title: Home
seo_title: 'Freelance Web Designer & Developer - Worcester, UK'
content:
  - title: 'Web Developer based in Worcester, UK'
    template: hero
  - id: about
    background_colour: Gray-100
    align: Center
    column:
      - column_width: col-md-6
        column_content:
          - title: About me
            lead: ''
            template: section-header
          - text: "**Hello, I’m Shaun \U0001F44B**\n\nI'm a self-taught, full-stack developer with over a decade of experience crafting websites. With a keen eye for design, I approach projects from a unique perspective. My philosophy is simple: websites should be swift, user-friendly, and accessible to all.\n\nWhen I'm not building websites, I enjoy hiking, rowing, playing video games and cooking. I'm also a devoted football fan, proudly supporting Arsenal through every match!\n\n<Button button_label=\"View CV\" button_type=\"primary\" button_link=\"https://test.com\" button_link_target=\"_blank\" />\n"
            template: section-text
      - column_width: col-md-5 offset-md-1
        column_content:
          - image: /me.jpg
            alt: shaun
            align: center
            template: section-image
    template: section
  - projects:
      - project: _projects/devflow.md
      - project: _projects/letterstreak.md
      - project: _projects/yourchoices.md
      - project: _projects/dishify.md
    template: project-slider
  - id: services
    background_colour: Gray-100
    align: Top
    column:
      - column_width: col-lg-3
        column_content:
          - title: What i do
            lead: ''
            template: section-header
      - column_width: col-lg-8 offset-lg-1
        column_content:
          - services:
              - service: _services/custom-wordpress-development.md
              - service: _services/custom-web-development.md
              - service: _services/bespoke-web-design.md
              - service: _services/wordpress-optimisation.md
            template: services-grid
    template: section
  - background_colour: White
    align: Top
    column:
      - column_width: col-md-3
        column_content:
          - title: Blog
            lead: Explore insights and perspectives on various topics
            template: section-header
      - column_width: col-lg-8 offset-lg-1
        column_content:
          - order_by: date
            template: recent-posts
    template: section
  - id: contact
    background_colour: Gray-100
    column:
      - column_width: col-lg-3
        column_content:
          - title: Contact me
            lead: >-
              Use the contact form below to get in touch and i’ll try my best to
              back to you within 48 hours.
            template: section-header
      - column_width: col-lg-8 offset-lg-1
        column_content:
          - fields:
              - label: Name
                name: name
                required: true
                description: Enter your name here
                type: text
                template: text-field
              - label: Email
                name: email
                required: true
                description: Enter your email address
                type: email
                template: text-field
              - label: Telephone
                name: telephone
                required: false
                description: Enter your phone number
                type: tel
                template: text-field
              - label: Message
                name: message
                required: true
                template: textarea
            template: form
    template: section
---

