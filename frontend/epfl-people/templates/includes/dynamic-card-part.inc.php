<?php

// $position_label, $custom_data and $people_data vars are required for this partial file.

$markup .= "
<script>

var postionLabel = '$position_label';

var checkboxFields = $checkbox_fields;

var customData = $custom_data;

var peopleData = [
    $people_data
];

var filterOptions = {
    position: Array.from(new Set(peopleData.map(x => x.position))).sort()
};

//\" // comment to better debug js ?> <script>

var peoplespace = {}

peoplespace.filters = {}

peoplespace.updateFilters = function () {
    var check = document.querySelectorAll(\"input[type=checkbox]\");
    var results = []
    for (var i = 0; i < check.length; i++) {
        results.push({
            name: check[i].name,
            value: check[i].value,
            checked: check[i].checked
        });
    }
    const filters = results.filter(x => x.checked).reduce((obj, val) => {
        obj[val.name] = obj[val.name] || []
        obj[val.name].push(val.value)
        return obj    
    }, {})
    peoplespace.filters = filters
    this.renderCards()
}

peoplespace.getCheckBoxGroups = function (filterOptions) {
    var checkboxesGroups =  `<div style='padding: 2rem; background-color: #f5f5f5; font-size: smaller;'>
    <h5>Positions Filter:</h5>
    \${filterOptions.position.map(pos => 
        `<div class='custom-control custom-checkbox'>
            <input type='checkbox' value='\${pos}' id='\${pos}' class='custom-control-input' onclick='peoplespace.updateFilters()' name='position' checked>
            <label class='custom-control-label' for='\${pos}'>\${pos}</label></div>`).join('')}
    </div>`
    return checkboxesGroups
}

peoplespace.getCustomData = function (custom) {
    if (!custom) {
        return ''
    }
    var customMarkup = custom.map(prop => `<dt>\${prop.key}</dt><dd>\${prop.value}</dd>`)
    return customMarkup
}

peoplespace.getFunctionPart = function (position) {
    if (position) {
        return `
        <dt>\${postionLabel}</dt>
        <dd>\${position}</dd>`;
    }
    return `
        <dt></dt>
        <dd>&nbsp;</dd>`;
}

peoplespace.getCardComponent = function ({sciper, name, lastname, picture, peopleUrl, position, email, phone, custom}) {
    return `

    <div class='card' id='\${sciper}'>
    <div class='card-body d-md-flex flex-md-column'>
      <div class='my-3'>
        <img style='height:8rem;' class='img-fluid rounded-circle mb-2 person-card-avatar' src='\${picture}' alt='\${name} \${lastname}'>
      </div>
      <h3>
        <a class='link-pretty' href='\${peopleUrl}' data-jzz-gui-player='true'>
          \${name} \${lastname}
        </a>
      </h3>
      <dl class='definition-list definition-list-grid my-0'>
        \${peoplespace.getFunctionPart(position)}
        \${peoplespace.getCustomData(custom)}
        <dt></dt>
        <dd>&nbsp;</dd>
      </dl>
      <div class='w-100 mt-2 mt-md-auto'>
        <a class='btn btn-block btn-primary mb-2' href='mailto:\${email}' data-jzz-gui-player='true'>\${email}</a>
        <a class='btn btn-block btn-secondary' href='tel:\${phone}' data-jzz-gui-player='true'>\${phone}</a>
      </div>
    </div>
  </div>`
}

peoplespace.filterCard = function (card) {
    var condition = true
    Object.keys(peoplespace.filters).forEach(filterKey => {
        if (!card[filterKey]) {
            condition = false
        }
        if (!peoplespace.filters[filterKey].includes(card[filterKey])) {
            condition = false
        }
    })
    return condition
 }

 peoplespace.getFilteredData = function () {
     const filteredData = peopleData.filter(card => peoplespace.filterCard(card))
     return filteredData
 }

 peoplespace.renderCards = function () {
    var wrapperCards = document.getElementById('dyn-cards');
    var allCards = this.getFilteredData(peopleData).map(data => peoplespace.getCardComponent(data)).join('');
    wrapperCards.innerHTML = `<div class='card-deck'>\${allCards}</div>`;
 }

 peoplespace.renderCheckboxes = function () {
    var wrapperCheckboxes = document.getElementById('dyn-filters');
    var checkboxGroups = peoplespace.getCheckBoxGroups(filterOptions);
    wrapperCheckboxes.innerHTML = checkboxGroups
 }

 peoplespace.renderPeopleComponents = function () {
   
    peoplespace.renderCheckboxes()
    peoplespace.renderCards()
    peoplespace.updateFilters()

 }

 peoplespace.initialize = function () {
    this.renderPeopleComponents();
}

window.onload = (event) => {
    peoplespace.initialize();
}
</script>
";

?>