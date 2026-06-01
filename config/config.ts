export const config = {
  name: 'TestApp',
  host: 'localhost',
  port: 9090,
  asyncStorage: true,
  networking: {
    ignoreUrls: /symbolicate/,
  },
};
