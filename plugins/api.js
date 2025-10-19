export default async (ctx, inject) => {
    const useMock = process.env.USE_MOCK === 'true';
    const { default: plugin } = useMock
        ? await import('./api/mock.js')
        : await import('./api/real.js');

    plugin(ctx, inject);
};