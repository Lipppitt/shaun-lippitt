---
title: Home
content:
- template: hero
  title: Web designer & developer based in Worcester, UK.
- template: section
  background_colour: Grey
  title: About me
  lead: ''
  content:
  - template: content
    content: |-
      **Hello, I’m Shaun.** I'm a self-taught, full stack developer with over 10 years experience in building websites. Unlike most web developers, I have good eye for design which allows me to take a different perspective on a project. I believe websites should be fast, easy-to-use and accessible.

      Some of the technologies I work with are: PHP, Laravel, Wordpress, HTML, CSS/SASS, Javascript, jQuery, Vue.js, Node.js & React.
  - template: section-image
    image: ''
  layout: 60/40
  column:
  - column_content:
    - template: section-header
      title: About me
      lead: ''
    - template: section-text
      text: |-
        **Hello, I’m Shaun.** I'm a self-taught, full stack developer with over 10 years experience in building websites. Unlike most web developers, I have good eye for design which allows me to take a different perspective on a project. I believe websites should be fast, easy-to-use and accessible.

        Some of the technologies I work with are: PHP, Laravel, Wordpress, HTML, CSS/SASS, Javascript, jQuery, Vue.js, Node.js & React.
    column_width: col-md-7
  - column_width: col-md-5
    column_content:
    - template: section-image
      image: ''
  id: about_me
- template: section
  background_colour: White
  title: Projects
  content:
  - template: project-slider
    projects: _projects/greybox-self-storage.md
  lead: ''
  layout: Full Width
  column:
  - column_width: col-md-12
    column_content:
    - template: section-header
      title: Projects
      lead: ''
    - template: project-slider
      projects: _projects/greybox-self-storage.md
  id: projects
- template: section
  background_colour: Grey
  title: Services
  content:
  - template: services-grid
    services: []
  lead: ''
  layout: 60/40
  column:
  - column_width: col-lg-3
    column_content:
    - template: section-header
      title: What i do
      lead: ''
  - column_width: col-lg-8 offset-lg-1
    column_content:
    - template: services-grid
      services: []
  id: services
- template: section
  background_colour: White
  title: Contact me
  lead: Use the contact form below to get in touch and i’ll try my best to back to
    you within 48 hours.
  layout: 60/40
  content: []
  column:
  - column_width: col-lg-3
    column_content:
    - template: section-header
      title: Contact me
      lead: Use the contact form below to get in touch and i’ll try my best to back
        to you within 48 hours.
  - column_width: col-lg-8 offset-lg-1
    column_content:
    - template: form
      fields:
      - template: text-field
        label: Your Name
        description: Enter your name here
        name: name
        required: true
        type: text
      - template: text-field
        label: Your Email
        name: email
        required: true
        description: Enter your email address
        type: email
      - template: text-field
        label: Your Telephone
        name: telephone
        description: Enter your phone number
        type: tel
        required: false
      - template: textarea
        label: Your message
        name: message
        required: true
      - template: text-field
        label: Send
        type: submit
        name: ''
        required: false
        description: ''
  id: contact

---
