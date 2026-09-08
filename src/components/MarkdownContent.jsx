import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ content }) {
  return (
    <div className="clinic-content tnum w-full min-w-0 max-w-full overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="my-4 w-full max-w-full overflow-x-auto">
              <table className="w-max min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="whitespace-nowrap border border-gray-300 px-3 py-2 text-center">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="whitespace-nowrap border border-gray-300 px-3 py-2 text-center">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
