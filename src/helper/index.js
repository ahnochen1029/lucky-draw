export function setData(key, value) {
    if (typeof value === 'string') {
        return localStorage.setItem(key, value);
    }
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        return err;
    }
}

export function getData(key) {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch (err) {
        return value;
    }
}

export function removeData(key) {
    return localStorage.removeItem(key);
}

export function clearData() {
    return localStorage.clear();
}

export function getDomData(element, dataName) {
    if (!element || !dataName || !element.getAttribute) {
        return;
    }
    return element.getAttribute('data-' + dataName);
}

export const configField = 'config'; // 配置数据
export const resultField = 'result'; // 抽獎結果
export const newLotteryField = 'newLottery'; // 新增奖项
export const listField = 'list'; // 名单
export function conversionCategoryName(key) {
    let name = '';
    switch (key) {
        case 'firstPrize':
            name = '頭獎-現金';
            break;
        case 'secondPrize':
            name = '二獎-現金';
            break;
        case 'thirdPrize1':
            name = '三獎-郵政禮卷';
            break;
        case 'thirdPrize2':
            name = '三獎-遠東百貨禮券';
            break;
        case 'thirdPrize3':
            name = '三獎-SOGO禮卷';
            break;
        case 'thirdPrize4':
            name = '三獎-現金';
            break;
        case 'fourthPrize1':
            name = '四獎-現金';
            break;
        case 'fourthPrize2':
            name = '四獎-郵政禮券';
            break;
        case 'fourthPrize3':
            name = '四獎-Lenovo Tab M10';
            break;
        case 'fourthPrize4':
            name = '四獎-新光三越禮券';
            break;
        case 'fourthPrize5':
            name = '四獎-禮券';
            break;
        case 'fourthPrize6':
            name = '四獎-電熱水瓶';
            break;
        default:
            break;
    }
    const newLottery = getData(newLotteryField) || [];
    const findres = newLottery.find(item => item.key === key);
    if (findres) {
        name = findres.name;
    }
    return name;
}
