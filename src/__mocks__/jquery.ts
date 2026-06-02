const $ = jest.fn().mockReturnValue({
    on: jest.fn().mockReturnThis(),
    off: jest.fn().mockReturnThis(),
    val: jest.fn().mockReturnThis(),
    prop: jest.fn().mockReturnThis(),
    toggle: jest.fn().mockReturnThis(),
    show: jest.fn().mockReturnThis(),
    hide: jest.fn().mockReturnThis(),
    html: jest.fn().mockReturnThis(),
    addClass: jest.fn().mockReturnThis(),
    removeClass: jest.fn().mockReturnThis(),
    closest: jest.fn().mockReturnThis(),
    empty: jest.fn().mockReturnThis(),
    append: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnValue({ top: 0 }),
    height: jest.fn().mockReturnValue(600),
    css: jest.fn().mockReturnThis(),
    change: jest.fn().mockReturnThis(),
    click: jest.fn().mockReturnThis(),
});
($ as any).fn = {};
export default $;
module.exports = $;
