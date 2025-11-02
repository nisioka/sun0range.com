import React, { useEffect } from 'react';

type DisqusCommentsProps = {
  shortname: string;
  config: {
    url: string;
    identifier: string;
    title: string;
  };
};

const DisqusComments: React.FC<DisqusCommentsProps> = ({ shortname, config }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).disqus_config = function () {
        this.page.url = config.url;
        this.page.identifier = config.identifier;
        this.page.title = config.title;
      };

      const script = document.createElement('script');
      script.src = `https://${shortname}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', String(new Date().getTime()));
      document.body.appendChild(script);

      return () => {
        // Clean up the script and the Disqus thread when the component unmounts
        const disqusThread = document.getElementById('disqus_thread');
        if (disqusThread) {
          disqusThread.innerHTML = '';
        }
        const disqusScript = document.querySelector(`script[src="https://${shortname}.disqus.com/embed.js"]`);
        if (disqusScript) {
          document.body.removeChild(disqusScript);
        }
      };
    }
  }, [shortname, config]);

  return <div id="disqus_thread" />;
};

export default DisqusComments;
