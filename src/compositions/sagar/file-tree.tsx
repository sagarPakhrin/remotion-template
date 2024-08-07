import { FaChevronDown } from "react-icons/fa";
import { cn } from "../../lib/utils";

type TreeNode = {
  name: string;
  children: { [key: string]: TreeNode };
};

function insertPath(root: TreeNode, path: string) {
  const parts = path.split("/");
  let currentNode = root;

  for (const part of parts) {
    if (!currentNode.children[part]) {
      currentNode.children[part] = {
        name: part,
        children: {},
      };
    }
    currentNode = currentNode.children[part];
  }
}

function buildTree(paths: string[]): TreeNode {
  const root: TreeNode = {
    name: "",
    children: {},
  };

  for (const path of paths) {
    insertPath(root, path);
  }

  return root;
}

interface FileTreeProps {
  node: TreeNode;
  level?: number;
  currentFile: string;
  pathSoFar?: string;
}

const FileTree: React.FC<FileTreeProps> = ({
  node,
  level = 0,
  currentFile,
  pathSoFar = "",
}) => {
  return (
    <div>
      {Object.keys(node.children).map((key) => {
        const child = node.children[key];
        const isFile = Object.keys(child.children).length === 0;

        const fullPath = pathSoFar ? `${pathSoFar}/${child.name}` : child.name;
        const isCurrent = fullPath === currentFile;

        return (
          <div key={key} className="flex flex-col">
            {isFile ? (
              <div
                className={cn(
                  "pl-3 border-l-4 border-transparent",
                  isCurrent &&
                    "border-neutral-600 bg-neutral-700 bg-opacity-25 text-white rounded-md",
                )}
                style={{ paddingLeft: `${level * 16}px` }}
              >
                {isCurrent ? (
                  <span className="font-bold">{child.name}</span>
                ) : (
                  child.name
                )}
              </div>
            ) : (
              <>
                <div
                  className="font-bold text-blue-400 flex items-center gap-2"
                  style={{ paddingLeft: `${level * 16}px` }}
                >
                  <FaChevronDown /> {child.name}
                </div>
                <FileTree
                  node={child}
                  level={level + 1}
                  currentFile={currentFile}
                  pathSoFar={fullPath}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const Explorer = ({
  paths,
  currentIndex,
}: {
  paths: string[];
  currentIndex: number;
}) => {
  const tree = buildTree(paths);

  const currentFile = paths[currentIndex];

  return (
    <div className="flex flex-col">
      <FileTree node={tree} currentFile={currentFile} />
    </div>
  );
};
