export type Button = {
  name: string; // имя кнопки
  icon: string; // Кнопки
  title: string | null; //текст кнопки
  clue: string | null; // Подсказка
  action: {
    // Действие
    type: "edit" | "create" | "select" | "copy"; // Тип действия
    link: string; // Передаваемый контент
  };
  state?: ["disabled", "default"];
};
