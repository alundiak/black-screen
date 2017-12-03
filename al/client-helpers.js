// Alternative to Server approach
export function createFakeJson() {
    let desksLength = 90;
    let desks = [];

    for (var i = 1; i < desksLength; i++) {
        desks.push({
            // id_1_parent_g: 'KRK-L7-table--' + i,
            id_1_parent_g: 'table--' + i,
            id_2_child_path_table: 'table--' + i,
            id_3_child_path_reserved: 'reserved--' + i,
            id_4_child_path_equipment: 'equipment--' + i,
            id_5_child_g_text: 'text--' + i,
            ip: '72.26.129.' + i
        })
    }
    return desks
}