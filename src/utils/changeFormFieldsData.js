export function changeFormFieldsData(initialFields, data) {

    return initialFields.map(item => {

        if (item.name in data) {

            return {
                name: item.name,
                value: data[item.name],
        };
        }

        return item

    })
}
