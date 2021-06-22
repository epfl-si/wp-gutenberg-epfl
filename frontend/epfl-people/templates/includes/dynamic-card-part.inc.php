<?php

// $position_label, $checkbox_fields and $people_data vars are required for this partial file.

$markup .= "
<style>

.checkbox-container {
    max-width: 700px;
    max-height: 230px;
    overflow-y: auto;
}

.checkbox-label {
    white-space: nowrap;
}

.checkbox-groups-container {
    border: 1px solid #d5d5d5;
    padding: 2rem;
    background-color: #f5f5f5;
    font-size: smaller;
    width: 100%;
    margin-left: 1px;
    margin-bottom: 4px;
}

</style>

<script>

var postionLabel = '$position_label';

var officeLabel = '$office_label';

var checkboxFields = $checkbox_fields.filter(function (f) {
    return f !== '';
});

var peopleData = [
    $people_data
].map(function (item) {
    if (!item.custom) {
        return item;
    }
    var customObj = item.custom.reduce(function (obj, item) {
        obj[item.key] = item.value;
        return obj;
    }, {});
    return Object.assign({}, item, customObj);
});

function getFilterLabel (field) {
    if (field === 'position') {
        return postionLabel
    } else if (field === 'room') {
        return officeLabel
    }
    return field
}

var filterOptions = checkboxFields.map(field => ({
    id: field,
    options: Array.from(new Set(peopleData.map(x => x[field]))).filter(x => x).sort(),
    title: getFilterLabel(field)
}))

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

peoplespace.getSingleCheckbox = function (option, id) {
    return `<div class='custom-control custom-checkbox'>
    <input type='checkbox' value='\${option}' id='\${option}' class='custom-control-input' onclick='peoplespace.updateFilters()' name='\${id}' checked>
    <label class='custom-control-label checkbox-label' for='\${option}'>\${option}</label></div>`
}

peoplespace.handleAllCheckboxClick = function (checkboxesid) {
    const checkboxesRef = document.getElementsByName(checkboxesid);
    const checkedProp = checkboxesRef[0].checked
    for (let i = 1; i < checkboxesRef.length; i++) {
        checkboxesRef[i].checked = checkedProp
    }
    this.updateFilters()
}

peoplespace.getAllCheckbox = function (groupid) {
    return `<div class='custom-control custom-checkbox'>
    <input type='checkbox' value='All' id='\${groupid}_All' class='custom-control-input' onclick='peoplespace.handleAllCheckboxClick(\"\${groupid}\")' name='\${groupid}' checked>
    <label class='custom-control-label' for='\${groupid}_All'>All</label></div>`
}

peoplespace.getSingleGroup = function (item) {
    return `
    <div class='col-sm-3'>
        <h5>\${item.title}:</h5>
        <div class='checkbox-container'>
        \${peoplespace.getAllCheckbox(item.id)}
        \${item.options.map(option => peoplespace.getSingleCheckbox(option, item.id)).join('')}
        </div>
    </div>`;
}

peoplespace.getCheckBoxGroups = function () {
    var checkboxesGroups =  `<div class='row checkbox-groups-container'>
    \${filterOptions.filter(item => checkboxFields.includes(item.id)).map(item => peoplespace.getSingleGroup(item))}
    </div>`
    return checkboxesGroups
}

peoplespace.getCustomData = function (custom) {
    if (!custom) {
        return ''
    }
    var customMarkup = custom.map(prop => `<dt>\${prop.key}</dt><dd>\${prop.value}</dd>`)
    return customMarkup.join('')
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

peoplespace.getOfficePart = function (room, roomUrl) {
    if (room && roomUrl) {
        return `
        <dt>\${officeLabel}</dt>    
        <dd><a class='link-pretty' href='\${roomUrl}' data-jzz-gui-player='true'>\${room}</a></dd>`;
    }
    return `
        <dt></dt>
        <dd>&nbsp;</dd>`;
}

peoplespace.getCardComponent = function ({sciper, name, lastname, picture, peopleUrl, room, roomUrl, position, email, phone, custom}) {
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
        \${peoplespace.getOfficePart(room, roomUrl)}
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
    var conditions = [];
    Object.keys(peoplespace.filters).forEach(filterKey => {
        if (peoplespace.filters[filterKey].includes('All')) {
            // Skip
        }
        else if (!card[filterKey]) {
            conditions.push(1);
        }
        else if (!peoplespace.filters[filterKey].includes(card[filterKey])) {
            conditions.push(1);
        }
    })
    return conditions.length === 0
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
    var checkboxGroups = peoplespace.getCheckBoxGroups();
    wrapperCheckboxes.innerHTML = checkboxGroups
 }

 peoplespace.renderPeopleComponents = function () {
    if (checkboxFields.length > 0) {
        peoplespace.renderCheckboxes()
    }
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

<noscript>
    <b>You need to have Javascript activated in order to render this page.</b>
</noscript>

";

?>