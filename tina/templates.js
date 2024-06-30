import {IconPickerInput} from "../components/fields/icon";

export function formFields() {
    return [
        {
            type: "object",
            list: true,
            templateKey: "template",
            label: "Fields",
            name: "fields",
            templates: [
                {
                    fields: inputFields(),
                    label: "Input",
                    name: "text_field",
                    nameOverride: "text-field",
                },
                {
                    fields: selectFields(),
                    label: "Select",
                    name: "select",
                },
                {
                    fields: textareaFields(),
                    label: "Textarea",
                    name: "textarea",
                },
            ],
        },
    ];
}
export function recentPostsFields() {
    return [
        {
            type: "string",
            name: "order_by",
            label: "Order by",
        },
    ];
}
 export function heroFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
        },
    ];
}

export function pageFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
        },
        {
            type: "string",
            name: "seo_title",
            label: "SEO Title",
            required: false,
        },
        {
            type: "string",
            name: "seo_description",
            label: "SEO Description",
            required: false,
            ui: {
                component: "textarea",
            },
        },
        {
            type: "object",
            list: true,
            templateKey: "template",
            label: "Content",
            name: "content",
            templates: [
                {
                    fields: heroFields(),
                    label: "Hero",
                    name: "hero",
                },
                {
                    fields: sectionFields(),
                    label: "Section",
                    name: "section",
                },
                {
                    fields: project_sliderFields(),
                    label: "Project Slider",
                    name: "project_slider",
                    nameOverride: "project-slider",
                },
            ],
        },
    ];
}

export function project_sliderFields() {
    return [
        {
            type: "object",
            name: "projects",
            label: "Projects",
            list: true,
            fields: [
                {
                    label: 'Project',
                    name: 'project',
                    type: 'reference',
                    collections: ['projects'],
                }
            ]
        },
    ];
}

export function projectFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
        },
        {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
                component: "textarea",
            },
        },
        {
            type: "image",
            name: "featured_image",
            label: "Featured Image",
        },
        {
            type: "object",
            list: true,
            templateKey: "template",
            label: "Content",
            name: "content",
            templates: [
                {
                    fields: sectionFields(),
                    label: "Section",
                    name: "section",
                },
            ],
        },
    ];
}

export function section_headerFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "Title",
        },
        {
            type: "string",
            name: "lead",
            label: "Lead",
            ui: {
                component: "textarea",
            },
        },
    ];
}

export function section_imageFields() {
    return [
        {
            type: "image",
            name: "image",
            label: "Image",
        },
        {
            name: "align",
            label: "Align",
            type: "string",
            options: [{
                value: "center",
                label: "Center"
            }, {
                value: "left",
                label: "Left"
            },
                {
                    value: "right",
                    label: "Right"
                }],
        },
    ];
}

export function section_galleryFields() {
    return [
        {
            type: "image",
            name: "gallery",
            label: "Gallery",
            list: true,
        }
    ];
}

export function section_textFields() {
    return [
        {
            type: "rich-text",
            name: "text",
            label: "Text",
            templates: [
                {
                    name: "Button",
                    label: "Button",
                    fields: [
                        {
                            name: "button_label",
                            label: "Label",
                            type: "string"
                        },
                        {
                            name: "button_type",
                            label: "Type",
                            type: "string",
                            options: [{
                                value: "primary",
                                label: "Primary"
                            }, {
                                value: "secondary",
                                label: "Secondary"
                            }]
                        },
                        {
                            name: "button_link",
                            label: "Link",
                            type: "string"
                        },
                        {
                            name: "button_link_target",
                            label: "Target",
                            type: "string",
                            options: [{
                                value: "_blank",
                                label: "_blank"
                            }
                            ]
                        },
                    ]
                }
            ]
        },
    ];
}

export function sectionFields() {
    return [
        {
            type: "string",
            name: "custom_id",
            nameOverride: "id",
            label: "ID",
        },
        {
            type: "string",
            name: "background_colour",
            label: "Background Colour",
            options: ["Primary", "Secondary", "White", "Gray-100"],
        },
        {
            type: "string",
            name: "align",
            label: "Align",
            options: ["Top", "Center"],
        },
        {
            type: "object",
            name: "column",
            label: "Column",
            list: true,
            fields: [
                {
                    type: "string",
                    name: "column_width",
                    label: "Column Width",
                    required: true,
                },
                {
                    type: "object",
                    list: true,
                    templateKey: "template",
                    label: "Column Content",
                    name: "column_content",
                    templates: [
                        {
                            fields: section_headerFields(),
                            label: "Section Header",
                            name: "section_header",
                            nameOverride: "section-header",
                        },
                        {
                            fields: section_textFields(),
                            label: "Section Text",
                            name: "section_text",
                            nameOverride: "section-text",
                        },
                        {
                            fields: section_imageFields(),
                            label: "Section Image",
                            name: "section_image",
                            nameOverride: "section-image",
                        },
                        {
                            label: 'Section Gallery',
                            name: 'section_gallery',
                            nameOverride: "section-gallery",
                            fields: section_galleryFields(),
                        },
                        {
                            fields: services_gridFields(),
                            label: "Services Grid",
                            name: "services_grid",
                            nameOverride: "services-grid",
                        },
                        {
                            fields: formFields(),
                            label: "Form",
                            name: "form",
                        },
                        {
                            label: "Recent Posts",
                            name: "recent_posts",
                            nameOverride: "recent-posts",
                            fields: recentPostsFields(),
                        },
                    ],
                },
            ],
        },
    ];
}

export function selectFields() {
    return [
        {
            type: "string",
            name: "label",
            label: "Label",
        },
        {
            type: "string",
            name: "name",
            label: "Name",
        },
        {
            type: "boolean",
            name: "required",
            label: "Required",
        },
        {
            type: "object",
            name: "options",
            label: "Options",
            list: true,
            fields: [
                {
                    type: "string",
                    name: "value",
                    label: "Value",
                },
                {
                    type: "string",
                    name: "label",
                    label: "Label",
                },
            ],
        },
    ];
}

export function serviceFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "Title",
        },
        {
            type: "string",
            name: "short_description",
            label: "Short Description",
            ui: {
                component: "textarea",
            },
        },
        {
            type: 'object',
            label: 'Icon',
            name: 'icon',
            fields: [
                {
                    type: 'string',
                    label: 'Icon',
                    name: 'name',
                    ui: {
                        component: IconPickerInput,
                    },
                },
            ],
        }
    ];
}

export function services_gridFields() {
    return [
        {
            type: "object",
            name: "services",
            label: "Services",
            list: true,
            fields: [
                {
                    label: 'Service',
                    name: 'service',
                    type: 'reference',
                    collections: ['services'],
                }
            ]
        },
    ];
}

export function inputFields() {
    return [
        {
            type: "string",
            name: "label",
            label: "Label",
        },
        {
            type: "string",
            name: "name",
            label: "Name",
        },
        {
            type: "boolean",
            name: "required",
            label: "Required",
        },
        {
            type: "string",
            name: "description",
            label: "Description",
        },
        {
            type: "string",
            name: "type",
            label: "Type",
            options: [
                "button",
                "checkbox",
                "color",
                "date",
                "datetime-local",
                "email",
                "file",
                "hidden",
                "image",
                "month",
                "number",
                "password",
                "radio",
                "range",
                "reset",
                "search",
                "submit",
                "tel",
                "text",
                "time",
                "url",
                "week",
            ],
        },
    ];
}

export function textareaFields() {
    return [
        {
            type: "string",
            name: "label",
            label: "Label",
        },
        {
            type: "string",
            name: "name",
            label: "Name",
        },
        {
            type: "boolean",
            name: "required",
            label: "Required",
        },
    ];
}
