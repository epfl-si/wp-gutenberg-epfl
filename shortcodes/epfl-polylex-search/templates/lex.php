<?php
/**
 * A site template for javascript
 * variable : lex
 */
?>

let one_row_template = `
    <tr>
        <td>${lex.title}</td>
        <td>${lex.tagline}</td>
        <td><a href="${lex.url}">${lex.url}</a></td>
        <td>
            `;

let rendered = one_row_template;

if ('tags' in lex) {
    <?php load_template(dirname(__FILE__).'/tags.php'); ?>
}

let one_row_template_end = `
        </td>
    </tr>
`;

rendered += one_row_template_end;
