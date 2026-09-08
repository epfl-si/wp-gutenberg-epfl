<?php

// $position_label, $checkbox_fields and $people_data vars are required for this partial file.
// Note: The two preg_replace statements in this file belong to a simple but workable minification effort,
$selected_fields_array = array_keys(array_filter($display_options, function($var) { return $var == 1; }));
$display_fields = implode("','", $selected_fields_array); 

$payload = preg_replace('/\v|\h(?:[\v\h]+)/', '', "
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
    background-color: #fff;
    font-size: smaller;
    width: 100%;
    margin-left: 1px;
    margin-bottom: 4px;
}

</style>

<script>

const postionLabel = '$position_label';

const officeLabel = '$office_label';

const displayFields = ['$display_fields'];

const checkboxFields = $checkbox_fields.filter(function (f) {
    return f !== '';
});

const peopleData = [
    $people_data
].map(function (item) {
    if (!item.custom) {
        return item;
    }
    const customObj = item.custom.reduce(function (obj, item, index) {
        obj[item.key] = `\${item.key}_____\${item.value}`;
        return obj;
    }, {});
    return Object.assign({}, item, customObj);
});

function getFilterLabel (field) {
    if (field === 'position') {
        return postionLabel;
    } else if (field === 'room') {
        return officeLabel;
    }
    return field
}

const filterOptions = checkboxFields.map(field => ({
    id: field,
    options: Array.from(new Set(peopleData.map(x => x[field]))).filter(x => x).sort(),
    title: getFilterLabel(field)
}));

const peoplespace = {};

peoplespace.filters = {};

peoplespace.updateFilters = function () {
    const check = document.querySelectorAll(\"input[type=checkbox]\");
    const results = [];
    for (var i = 0; i < check.length; i++) {
        results.push({
            name: check[i].name,
            value: check[i].value,
            checked: check[i].checked
        });
    }
    const filters = results.filter(x => x.checked).reduce((obj, val) => {
        obj[val.name] = obj[val.name] || [];
        obj[val.name].push(val.value);
        return obj;
    }, {});
    peoplespace.filters = filters;
    this.renderCards()
};

peoplespace.getSingleCheckbox = function (option, id) {
    return `<div class='custom-control custom-checkbox'>
    <input type='checkbox' value='\${option}' id='\${option}' class='custom-control-input' onclick='peoplespace.updateFilters()' name='\${id}' checked>
    <label class='custom-control-label checkbox-label' for='\${option}'>\${option.replace(`\${id}_____`, '')}</label></div>`
};

peoplespace.checkIfAllCardsShouldBeHidden = function () {
    const check = document.querySelectorAll(\"input[type=checkbox]\");
    const selectionState = filterOptions.map(element => {
        const identifier = element.id;
        const thisGroup =  document.getElementsByName(identifier);
        const thisGroupArr = Array.prototype.slice.call(thisGroup).filter(x => x.checked);
        return thisGroupArr.length > 0;
    });
    if(selectionState.includes(false)) {
        peoplespace.hideAllCards()
    }
};

peoplespace.handleAllCheckboxClick = function (checkboxesid) {
    const checkboxesRef = document.getElementsByName(checkboxesid);
    const checkedProp = checkboxesRef[0].checked;
    for (let i = 1; i < checkboxesRef.length; i++) {
        checkboxesRef[i].checked = checkedProp;
    }    
    peoplespace.updateFilters();
    peoplespace.checkIfAllCardsShouldBeHidden();
};

peoplespace.getAllCheckbox = function (groupid) {
    return `<div class='custom-control custom-checkbox'>
    <input type='checkbox' value='All' id='\${groupid}_All' class='custom-control-input' onclick='peoplespace.handleAllCheckboxClick(\"\${groupid}\")' name='\${groupid}' checked>
    <label class='custom-control-label' for='\${groupid}_All'>All</label></div>`;
};

peoplespace.getSingleGroup = function (item) {
    return `
    <div class='col-sm-3'>
        <h5>\${item.title.charAt(0).toUpperCase() + item.title.slice(1)}:</h5>
        <div class='checkbox-container'>
        \${peoplespace.getAllCheckbox(item.id)}
        \${item.options.map(option => peoplespace.getSingleCheckbox(option, item.id)).join('')}
        </div>
    </div>`;
};

peoplespace.getCheckBoxGroups = function () {
    const checkboxesGroups =  `<div class='row checkbox-groups-container'>
    \${filterOptions.filter(item => checkboxFields.includes(item.id)).map(item => peoplespace.getSingleGroup(item))}
    </div>`;
    return checkboxesGroups;
};

peoplespace.getCustomData = function (custom) {
    if (!custom) {
        return '';
    } else if (!displayFields.includes('display_custom_data')) {
        return '';
    }
    const customMarkup = custom.map(prop => `<dt>\${prop.key}</dt><dd>\${prop.value}</dd>`);
    return customMarkup.join('');
};

peoplespace.getFunctionPart = function (position) {
    if (position && displayFields.includes('display_function')) {
        return `
        <dt>\${postionLabel}</dt>
        <dd>\${position}</dd>`;
    }
    else if (displayFields.includes('display_function')) {
        return `
            <dt></dt>
            <dd>&nbsp;</dd>`;
    }
    return ``;
};

peoplespace.getOfficePart = function (room, roomUrl) {
    if (room && roomUrl && displayFields.includes('display_room')) {
        return `
        <dt>\${officeLabel}</dt>    
        <dd><a class='link-pretty' href='\${roomUrl}' data-jzz-gui-player='true'>\${room}</a></dd>`;
    }
    else if (displayFields.includes('display_room')) {
        return `
        <dt></dt>
        <dd>&nbsp;</dd>`;
    }
    return ``;
};

peoplespace.getEmailPart = function (email) {
    if (email && displayFields.includes('display_email')) {
        return `
        <a class='btn btn-block btn-primary mb-2' href='mailto:\${email}' data-jzz-gui-player='true'>\${email}</a>   
        `;
    }
    return ``;
};

peoplespace.getPhonePart = function (phone) {
    if (phone && displayFields.includes('display_phone')) {
        return `
        <a class='btn btn-block btn-secondary' href='tel:\${phone}' data-jzz-gui-player='true'>\${phone}</a>
        `;
    }
    return ``;
};

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
      </dl>
      <div class='w-100 mt-2 mt-md-auto'>
        \${peoplespace.getEmailPart(email)}
        \${peoplespace.getPhonePart(phone)}
      </div>
    </div>
  </div>`;
};

peoplespace.filterCard = function (card) {
    const conditions = [];
    Object.keys(peoplespace.filters).forEach(filterKey => {
        if (peoplespace.filters[filterKey].includes('All')) {
            /* Skip */
        }
        else if (!card[filterKey]) {
            conditions.push(1);
        }
        else if (!peoplespace.filters[filterKey].includes(card[filterKey])) {
            conditions.push(1);
        }
    });
    return conditions.length === 0
 };

 peoplespace.getFilteredData = function () {
     const filteredData = peopleData.filter(card => peoplespace.filterCard(card));
     return filteredData;
 };

 peoplespace.hideAllCards = function () {
    const wrapperCards = document.getElementById('dyn-cards');
    wrapperCards.innerHTML = `<div class='card-deck'></div>`;
 };

 peoplespace.renderCards = function () {
    const wrapperCards = document.getElementById('dyn-cards');
    const allCards = peoplespace.getFilteredData(peopleData).map(data => peoplespace.getCardComponent(data)).join('');
    wrapperCards.innerHTML = `<div class='card-deck'>\${allCards}</div>`;
 };

 peoplespace.renderCheckboxes = function () {
    const wrapperCheckboxes = document.getElementById('dyn-filters');
    const checkboxGroups = peoplespace.getCheckBoxGroups();
    wrapperCheckboxes.innerHTML = checkboxGroups;
 };

 peoplespace.renderPeopleComponents = function () {
    if (checkboxFields.length > 0) {
        peoplespace.renderCheckboxes();
    }
    peoplespace.renderCards();
    peoplespace.updateFilters();

 };

 peoplespace.initialize = function () {
    this.renderPeopleComponents();
};

window.onload = (event) => {peoplespace.initialize();}

</script>

<noscript>
    <b>You need to have Javascript activated in order to render this page.</b>
</noscript>

");

// Initialize the $markup variable if is not set
$markup = $markup ?? '';

// Check the $markup variable is set and is not undefined
$markup .= preg_replace('/peoplespace/', 'pspc', $payload);

?>
