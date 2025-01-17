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
        case 'fourthPrize1':
            name = '四獎-遠東百貨禮券';
            break;
        case 'fourthPrize2':
            name = '四獎-SOGO禮券';
            break;
        case 'fourthPrize3':
            name = '四獎-現金';
            break;
        case 'fifthPrize1':
            name = '五獎-現金';
            break;
        case 'fifthPrize2':
            name = '五獎-郵政禮券';
            break;
        case 'fifthPrize3':
            name = '五獎-新光三越禮券';
            break;
        case 'fifthPrize4':
            name = '五獎-Lenovo Tab M10';
            break;
        case 'fifthPrize5':
            name = '五獎-電熱水瓶';
            break;
        case 'sixthPrize1':
            name = '六獎-現金';
            break;
        case 'sixthPrize2':
            name = '六獎-家樂福禮券';
            break;
        case 'sixthPrize3':
            name = '六獎-全聯禮券';
            break;
        case 'sixthPrize4':
            name = '六獎-西堤牛排套餐禮券';
            break;
        case 'sixthPrize5':
            name = '六獎-郵政禮券';
            break;
        case 'sixthPrize6':
            name = '六獎-Edenred';
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
