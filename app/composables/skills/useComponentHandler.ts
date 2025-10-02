import VueJs from "~/components/devTools/devicon/Vuejs.vue";
import NuxtJs from "~/components/devTools/devicon/NuxtJs.vue";
import Typescript from "~/components/devTools/devicon/Typescript.vue";
import Javascript from "~/components/devTools/devicon/Javascript.vue";
import Webstorm from "~/components/devTools/devicon/Webstorm.vue";
import Cursor from "~/components/devTools/devicon/Cursor.vue";
import TailwindCss from "~/components/devTools/devicon/TailwindCss.vue";
import MongoDb from "~/components/devTools/devicon/MongoDb.vue";
import Bootstrap from "~/components/devTools/devicon/Bootstrap.vue";
import Vuetify from "~/components/devTools/devicon/Vuetify.vue";
import React from "~/components/devTools/devicon/React.vue";
import Next from "~/components/devTools/devicon/Next.vue";
import Angular from "~/components/devTools/devicon/Angular.vue";
import Cpp from "~/components/devTools/devicon/Cpp.vue";
import AdonisJs from "~/components/devTools/devicon/AdonisJs.vue";
import Prisma from "~/components/devTools/devicon/Prisma.vue";
import Flutter from "~/components/devTools/devicon/React.vue";
import MySql from "~/components/devTools/devicon/MySql.vue";
import Php from "~/components/devTools/devicon/Php.vue";
import Python from "~/components/devTools/devicon/Python.vue";
import AdobeXd from "~/components/devTools/devicon/AdobeXd.vue";
import Figma from "~/components/devTools/devicon/Figma.vue";
import Node from "~/components/devTools/devicon/Node.vue";
import typescript from "~/components/devTools/devicon/Typescript.vue";

export const useIconComponentHandler = () => {
  const handleIconComponent = (value: string) => {
    console.log(value);
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
      case "devicon-flutter-plain":
        return Flutter;
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
      default:
        return null;
    }
  };
  return {
    handleIconComponent,
  };
};
