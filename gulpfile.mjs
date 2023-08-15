import gulp from "gulp";
import babel from "@rollup/plugin-babel";
import { rollup } from "rollup";
import file from "gulp-file";
import { glob } from "glob";
import typescript from "@rollup/plugin-typescript";
import { deleteAsync } from "del";
import terser from "@rollup/plugin-terser";
import exec from "gulp-exec";

gulp.task("clean", () => {
  return deleteAsync(["dist/**/*"]);
});

gulp.task("generate:typescript", () => {
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
          name: file.fileName.replace("dist/", "").replace("types/", ""),
          source: file.code ?? file.source,
        };
      });

      return file(files).pipe(gulp.dest("dist/esm/"));
    });
});

gulp.task("generate:storybook", () => {
  return gulp
    .src("./src/**/*.stories.tsx")
    .pipe(exec("npx storybook build -o ./dist/storybook -c .storybook"));
});

gulp.task(
  "build",
  gulp.series("clean", "generate:typescript", "generate:storybook")
);
