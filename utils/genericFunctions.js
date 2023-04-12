const getTemplateIcon = (templateId) => {
  try {
    return require(`../assets/templateIcon/${templateId}.png`);
  } catch {
    return `https://picsum.photos/200`;
  }
};

const countBy = (arr, prop) => arr.reduce((prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev), {});

export { getTemplateIcon, countBy };
