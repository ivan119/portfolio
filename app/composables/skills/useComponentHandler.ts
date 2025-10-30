import VueJs from "~/components/ui/icons/devicon/Vuejs.vue";
import NuxtJs from "~/components/ui/icons/devicon/NuxtJs.vue";
import Typescript from "~/components/ui/icons/devicon/Typescript.vue";
import Javascript from "~/components/ui/icons/devicon/Javascript.vue";
import Webstorm from "~/components/ui/icons/devicon/Webstorm.vue";
import Cursor from "~/components/ui/icons/devicon/Cursor.vue";
import TailwindCss from "~/components/ui/icons/devicon/TailwindCss.vue";
import MongoDb from "~/components/ui/icons/devicon/MongoDb.vue";
import Bootstrap from "~/components/ui/icons/devicon/Bootstrap.vue";
import Vuetify from "~/components/ui/icons/devicon/Vuetify.vue";
import React from "~/components/ui/icons/devicon/React.vue";
import Next from "~/components/ui/icons/devicon/Next.vue";
import Angular from "~/components/ui/icons/devicon/Angular.vue";
import Cpp from "~/components/ui/icons/devicon/Cpp.vue";
import AdonisJs from "~/components/ui/icons/devicon/AdonisJs.vue";
import Prisma from "~/components/ui/icons/devicon/Prisma.vue";
import MySql from "~/components/ui/icons/devicon/MySql.vue";
import Php from "~/components/ui/icons/devicon/Php.vue";
import Python from "~/components/ui/icons/devicon/Python.vue";
import AdobeXd from "~/components/ui/icons/devicon/AdobeXd.vue";
import Figma from "~/components/ui/icons/devicon/Figma.vue";
import Node from "~/components/ui/icons/devicon/Node.vue";
import ChartJs from "~/components/ui/icons/devicon/ChartJs.vue";
import Vercel from "~/components/ui/icons/devicon/Vercel.vue";
export const useIconComponentHandler = () => {
  const handleIconComponent = (value: string) => {
    switch (value) {
      case "devicon-vuejs-plain":
        return VueJs;
      case "devicon-nuxtjs-plain":
        return NuxtJs;
      case "devicon-typescript-plain":
        return Typescript;
      case "devicon-javascript-plain":
        return Javascript;
      case "devicon-webstorm-plain":
        return Webstorm;
      case "devicon-vscode-plain":
        return Cursor;
      case "devicon-tailwindcss-plain":
        return TailwindCss;
      case "devicon-mongodb-plain":
        return MongoDb;
      case "devicon-bootstrap-plain":
        return Bootstrap;
      case "devicon-vuetify-plain":
        return Vuetify;
      case "devicon-react-original":
      case "devicon-react-plain":
        return React;
      case "devicon-nextjs-original-wordmark":
      case "devicon-nextjs-plain":
        return Next;
      case "devicon-angularjs-plain":
        return Angular;
      case "devicon-cplusplus-plain":
        return Cpp;
      case "devicon-adonisjs-plain":
      case "devicon-adonisjs-original":
        return AdonisJs;
      case "devicon-prisma-plain":
        return Prisma;
      case "devicon-mysql-plain":
        return MySql;
      case "devicon-nodejs-plain":
        return Node;
      case "devicon-php-plain":
        return Php;
      case "devicon-python-plain":
        return Python;
      case "devicon-xd-plain":
        return AdobeXd;
      case "devicon-figma-plain":
        return Figma;
      case "devicon-chartjs-plain":
        return ChartJs;
      case "devicon-vercel-plain":
        return Vercel;
      default:
        return null;
    }
  };
  return {
    handleIconComponent,
  };
};
