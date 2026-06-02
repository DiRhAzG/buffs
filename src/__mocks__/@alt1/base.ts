export const ImageDetect = {
    imageDataFromBase64: jest.fn().mockResolvedValue({ width: 28, height: 27 }),
    findSubimage: jest.fn().mockReturnValue([]),
};

export class ImageDataSet {
    add = jest.fn();
    find = jest.fn().mockReturnValue(undefined);
}

export const captureHoldFullRs = jest.fn().mockReturnValue({});
export const PasteInput = { listen: jest.fn() };

const a1lib = { captureHoldFullRs, PasteInput, ImageDetect, ImageDataSet };
export default a1lib;
