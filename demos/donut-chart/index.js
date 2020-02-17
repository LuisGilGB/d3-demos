const chartData = [
    {
        itemName: 'First',
        itemValue: 3
    },
    {
        itemName: 'Second',
        itemValue: 2
    }
];

const form = document.querySelector('form');
const nameField = document.querySelector('#itemName');
const valueField = document.querySelector('#itemValue');
const errorEl = document.querySelector('#error');

const itemAddedEvent = new CustomEvent('itemadded');

form.addEventListener('submit', e => {
    e.preventDefault();

    if (nameField.value && valueField.value) {
        const newItem = {
            itemName: nameField.value,
            itemValue: +(valueField.value)
        }

        chartData.push(newItem);

        document.dispatchEvent(itemAddedEvent);
    } else {
        errorEl.textContent = "There are some lacking values. Please, enter some."
    }
});
