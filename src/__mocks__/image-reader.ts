export const loadImages = jest.fn().mockResolvedValue(undefined);
export const getPosition = jest.fn().mockReturnValue(undefined);
export const readNumbers = jest.fn().mockReturnValue(undefined);
export const outputImage = jest.fn();
export const checkPixelMatch = jest.fn().mockReturnValue(false);
export const generateMatchingImage = jest.fn().mockResolvedValue('');
export const imageToBase64 = jest.fn().mockResolvedValue('');
