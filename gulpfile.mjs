import gulp from "gulp";
import babel from "@rollup/plugin-babel";
import { rollup } from "rollup";
import file from "gulp-file";
import { glob } from "glob";
import typescript from "@rollup/plugin-typescript";
import { deleteAsync } from "del";
import terser from "@rollup/plugin-terser";
import exec from "gulp-exec";
import rename from "gulp-rename";

gulp.task("clean", () => {
  return deleteAsync(["dist/**/*"]);
});

gulp.task("build:component", () => {
  return rollup({
    input: glob.sync("src/**/*.{ts,tsx}"),
    plugins: [
      babel({
        presets: ["@babel/preset-env", "@babel/preset-react"],
        babelHelpers: "bundled",
      }),
      typescript(),
      terser(),
    ],
    external: ["react", "react-dom"],
  })
    .then((bundle) => {
      return bundle.generate({
        format: "esm",
        dir: "dist/",
        sourcemap: true,
        preserveModules: true,
      });
    })
    .then((gen) => {
      const files = gen.output.map((file) => {
        return {
          name: file.fileName.replace("src/", "").replace("types/", ""),
          source: file.code ?? file.source,
        };
      });

      return file(files).pipe(gulp.dest("dist/component/"));
    })
    .then(() => {
      return gulp
        .src("package.component.json")
        .pipe(rename("package.json"))
        .pipe(gulp.dest("dist/component/"));
    })
    .then(() => {
      return gulp.src("README.md").pipe(gulp.dest("dist/component/"));
    });
});

gulp.task("build:storybook", () => {
  return gulp
    .src("./src/**/*.stories.tsx")
    .pipe(exec("npx storybook build -o ./dist/storybook -c .storybook"));
});

gulp.task("build", gulp.series("clean", "build:component", "build:storybook"));
