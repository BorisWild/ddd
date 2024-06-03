function check_var(variable) {
    if (variable == null || variable === undefined ||
        typeof variable === 'undefined')
        return true;
    
    return false;
}

function check_sort(collection) {
    const bool_array = Object.keys(collection).map((key) => {
        if (check_var(collection[key])) return false;
        return true;
    });

    const index = bool_array.lastIndexOf(true);
    if (index == -1)
        return {col_name: "id", sort_order: "DESC"};

    const key = Object.keys(collection)[index];
    return {col_name: key, sort_order: collection[key]};
}

export {
    check_var,
    check_sort
}