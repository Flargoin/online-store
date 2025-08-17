export class DOMUtils {
    /**
     * Безопасное экранирование HTML
     * @param {*} text 
     * @returns 
     */
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Создание элемента с атрибутами и содержимым
     * @param {*} tagName 
     * @param {*} attributes 
     * @param {*} content 
     */
    static createElement(tagName, attributes = {}, content = '') {
        const element = document.createElement(tagName);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if(key === 'className') {
                element.className = value;
            } else if(key === 'innerHTML') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);

            }
        });
    }
}