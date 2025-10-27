// This is experimental
// Consider to remove since is bad practice
import { defineAsyncComponent } from "vue";

const iconMap: Record<string, () => Promise<any>> = {
  "devicon-vuejs-plain": () =>
    import("~/components/devTools/devicon/Vuejs.vue"),
  "devicon-nuxtjs-plain": () =>
    import("~/components/devTools/devicon/NuxtJs.vue"),
  "devicon-typescript-plain": () =>
    import("~/components/devTools/devicon/Typescript.vue"),
  "devicon-javascript-plain": () =>
    import("~/components/devTools/devicon/Javascript.vue"),
  "devicon-webstorm-plain": () =>
    import("~/components/devTools/devicon/Webstorm.vue"),
  "devicon-vscode-plain": () =>
    import("~/components/devTools/devicon/Cursor.vue"),
  "devicon-tailwindcss-plain": () =>
    import("~/components/devTools/devicon/TailwindCss.vue"),
  "devicon-mongodb-plain": () =>
    import("~/components/devTools/devicon/MongoDb.vue"),
  "devicon-bootstrap-plain": () =>
    import("~/components/devTools/devicon/Bootstrap.vue"),
  "devicon-vuetify-plain": () =>
    import("~/components/devTools/devicon/Vuetify.vue"),
  "devicon-react-original": () =>
    import("~/components/devTools/devicon/React.vue"),
  "devicon-react-plain": () =>
    import("~/components/devTools/devicon/React.vue"),
  "devicon-nextjs-original-wordmark": () =>
    import("~/components/devTools/devicon/Next.vue"),
  "devicon-nextjs-plain": () =>
    import("~/components/devTools/devicon/Next.vue"),
  "devicon-angularjs-plain": () =>
    import("~/components/devTools/devicon/Angular.vue"),
  "devicon-cplusplus-plain": () =>
    import("~/components/devTools/devicon/Cpp.vue"),
  "devicon-adonisjs-plain": () =>
    import("~/components/devTools/devicon/AdonisJs.vue"),
  "devicon-adonisjs-original": () =>
    import("~/components/devTools/devicon/AdonisJs.vue"),
  "devicon-prisma-plain": () =>
    import("~/components/devTools/devicon/Prisma.vue"),
  "devicon-mysql-plain": () =>
    import("~/components/devTools/devicon/MySql.vue"),
  "devicon-nodejs-plain": () =>
    import("~/components/devTools/devicon/Node.vue"),
  "devicon-php-plain": () => import("~/components/devTools/devicon/Php.vue"),
  "devicon-python-plain": () =>
    import("~/components/devTools/devicon/Python.vue"),
  "devicon-xd-plain": () => import("~/components/devTools/devicon/AdobeXd.vue"),
  "devicon-figma-plain": () =>
    import("~/components/devTools/devicon/Figma.vue"),
  "devicon-chartjs-plain": () =>
    import("~/components/devTools/devicon/ChartJs.vue"),
  "devicon-vercel-plain": () =>
    import("~/components/devTools/devicon/Vercel.vue"),
};

export const useIconComponentHandler = () => {
  const handleIconComponent = (value: string) => {
    const loader = iconMap[value];
    return loader ? defineAsyncComponent(loader) : null;
  };

  return { handleIconComponent };
};
