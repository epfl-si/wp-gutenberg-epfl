<?php
/**
 * A site template for javascript
 * variable : site
 */
?>

let one_row_template = `
    <tr>
        <td>${site.title}</td>
        <td>${site.tagline}</td>
        <td><a href="${site.url}">${site.url}</a></td>
        <td>
            `;

let rendered = one_row_template;

if ('tags' in site) {
    <?php load_template(dirname(__FILE__).'/tags.php'); ?>
}

let one_row_template_end = `
        </td>
    </tr>
`;

rendered += one_row_template_end;