module.exports = (date1, date2) => {
    const yearsDiff = date2.getFullYear() - date1.getFullYear();
    const monthsDiff = date2.getMonth() - date1.getMonth();
    const totalMonthsDiff = yearsDiff * 12 + monthsDiff;
    return totalMonthsDiff;
};