import { notification } from 'antd';

const breakLineIfRequired = (paragraph) => {
  const changeNewLine = paragraph && paragraph.replaceAll('\\n\\n', '\n\n');
  const singleChangeNewLine = changeNewLine && changeNewLine.replaceAll('\\n', '\n');

  const changeNewLineBr = paragraph && paragraph.replaceAll('\\n\\n', '<br/> <br/>');
  const lineBr = changeNewLineBr && changeNewLineBr.replaceAll('\\n', '<br/>');

  const formatContent =
    singleChangeNewLine &&
    singleChangeNewLine.split('\n').map(function (line, n) {
      // eslint-disable-next-line react/jsx-key
      return n === 0 ? [line] : [<br />, line];
    });
  return { formatContent, singleChangeNewLine, lineBr };
};

const projectIdByChar = (charlength) => {
  let ID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghtpoqjdchpd';
  for (var i = 0; i < charlength; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

const capitalizeFirstLetter = (string) => {
  return (string || ' ').charAt(0).toUpperCase() + (string || ' ').slice(1);
};
const FirstLetterToLowerCase = (string) => {
  return (string || ' ').charAt(0).toLowerCase() + (string || ' ').slice(1);
};

const getTemplateNameById = ({ templateList, templateId }) => {
  return templateList && templateId && templateList.find(({ id }) => id === templateId).title;
};

const numberFormat = (num) => {
  return num ? num.toLocaleString() : num;
};
const currencyFormat = (price) => {
  return price
    ? price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    : price;
};

export const ICON_ALERT_MESSAGE = (alertDesc) => {
  return notification.open({
    description: alertDesc,
    placement: 'bottomRight',
  });
};

const copyContent = (paragraph) => {
  const changeNewLine = paragraph && paragraph.replaceAll('\\n\\n', '\n \n');
  return changeNewLine;
};

const copyFormat = (html) => {
  if (html) {
    html = html.replace(/\n/g, '\n');
    html = html.replace(/\n\n/g, '\n');
    html = html.replace(/\t/g, '');
    html = html.replace(/<\/p>/g, '\n\n');
    html = html.replace(/<br>/g, '\n');
    html = html.replace(/<br( )*\/>/g, '\n');
    //parse html into text
    var dom = new DOMParser().parseFromString('<!doctype html><body>' + html, 'text/html');
    return dom.body.textContent;
  }
};
const usageCalculation = ({ teamMemberEmail, teamData, words }) => {
  const memberData = teamData && teamData.find(({ email }) => email === teamMemberEmail);
  const memberUsage = memberData && memberData.usage;
  if (memberUsage === undefined) {
    const UsageMember = teamData && teamData.filter(({ usage }) => usage !== undefined);
    const totalUsage = UsageMember.reduce(function (acc, obj) {
      return acc + obj.usage;
    }, 0);
    const remainingUsageMember = teamData && teamData.filter(({ usage }) => usage === undefined);
    const remainingWords = words - totalUsage;
    return remainingWords;
  }
};

export {
  breakLineIfRequired,
  projectIdByChar,
  getTemplateNameById,
  capitalizeFirstLetter,
  FirstLetterToLowerCase,
  numberFormat,
  currencyFormat,
  copyContent,
  copyFormat,
  usageCalculation,
};
