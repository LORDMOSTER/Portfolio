import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CorePhilosophy.css';

const engineeringTruthsVol2 = [
  "A backup isn't a backup until you've successfully restored from it.",
  "Never write a custom date-time parser. You will fail, and leap years will laugh at you.",
  "The 'S' in IoT stands for Security.",
  "Your system architecture is just a reflection of your company's communication structure.",
  "Two things are guaranteed in production: unexpected user input and network timeouts.",
  "If your API doesn't have rate limiting, it's not an API. It's a vulnerability.",
  "A query that runs fast locally will always find a way to crawl in production.",
  "Automate the deployment. Humans get tired, scripts don't.",
  "To understand recursion, you must first understand recursion.",
  "The most complex piece of software on your server is the one you wrote yesterday at 2 AM.",
  "You don't choose microservices. Microservices choose you when your monolith becomes unbearable.",
  "Always log the 'Why', not just the 'What'.",
  "A developer's best friend isn't their IDE; it's a reproducible test case.",
  "The cloud is infinitely scalable, but your budget is not.",
  "If you use 'admin' as your username, you deserve what happens next.",
  "Every line of code you write is a liability you have to maintain.",
  "There is nothing more permanent than a temporary hack deployed to production.",
  "If the documentation is wrong, the code is right. The code never lies.",
  "Version 1.0 is for learning how you should have built Version 1.0.",
  "Load balancing hides a multitude of sins. Until the load balancer fails.",
  "Asynchronous code is great, until it isn't. Then it's just confusing.",
  "Don't optimize for the 1% edge case if it ruins the experience for the 99%.",
  "An API is a promise. Breaking changes are broken promises.",
  "The most critical infrastructure runs on an old Debian server nobody wants to touch.",
  "If you don't define your timeout, the network will define it for you. Poorly.",
  "A 200 OK status code means the server received your request, not that it actually did what you wanted.",
  "Cryptography is like a blender. Don't try to build your own; just use the one you bought.",
  "The hardest bugs to fix are the ones that only happen on Tuesdays.",
  "Your commit message should explain the problem you solved, not the code you wrote.",
  "If it requires a 10-step manual process to restart, it's not a service; it's a liability.",
  "Monitoring tells you the system is broken. Observability tells you why.",
  "Just because you *can* put it in a Docker container doesn't mean you *should*.",
  "The database is the ultimate source of truth. The cache is just a highly confident rumor.",
  "A fast response with stale data is often better than a slow response with perfect data.",
  "Never test your error handling in production. Production will test it for you.",
  "The best security feature is deleting data you no longer need.",
  "If your system design requires a perfectly synchronized distributed clock, redesign it.",
  "Complexity is a tax you pay upfront. Simplicity is a tax you pay forever in refactoring.",
  "The easiest code to debug is the code that doesn't exist.",
  "A slow database query is just a DDoS attack you launch against yourself.",
  "Don't build an ecosystem when all you needed was a script.",
  "If your microservices share a database, they aren't microservices. They are a distributed monolith.",
  "The ultimate goal of software engineering is to make yourself obsolete through automation.",
  "You can either have two pizza teams, or a team that takes two years to ship.",
  "If the system works perfectly the first time, you haven't tested it hard enough.",
  "A string is not a date. Stop treating it like one.",
  "The most expensive phase of software development is maintenance. Write readable code.",
  "Always sanitize your inputs. Little Bobby Tables is always watching.",
  "If your deployment takes more than 15 minutes, you are deploying fear.",
  "The best engineers don't know all the answers; they just know how to read the stack trace.",
  "A backup isn't a backup until you've successfully restored from it.",
  "Never write a custom date-time parser. You will fail, and leap years will laugh at you.",
  "The 'S' in IoT stands for Security.",
  "Your system architecture is just a reflection of your company's communication structure.",
  "Two things are guaranteed in production: unexpected user input and network timeouts.",
  "If your API doesn't have rate limiting, it's not an API. It's a vulnerability.",
  "A query that runs fast locally will always find a way to crawl in production.",
  "Automate the deployment. Humans get tired, scripts don't.",
  "To understand recursion, you must first understand recursion.",
  "The most complex piece of software on your server is the one you wrote yesterday at 2 AM.",
  "You don't choose microservices. Microservices choose you when your monolith becomes unbearable.",
  "Always log the 'Why', not just the 'What'.",
  "A developer's best friend isn't their IDE; it's a reproducible test case.",
  "The cloud is infinitely scalable, but your budget is not.",
  "If you use 'admin' as your username, you deserve what happens next.",
  "Every line of code you write is a liability you have to maintain.",
  "There is nothing more permanent than a temporary hack deployed to production.",
  "If the documentation is wrong, the code is right. The code never lies.",
  "Version 1.0 is for learning how you should have built Version 1.0.",
  "Load balancing hides a multitude of sins. Until the load balancer fails.",
  "Asynchronous code is great, until it isn't. Then it's just confusing.",
  "Don't optimize for the 1% edge case if it ruins the experience for the 99%.",
  "An API is a promise. Breaking changes are broken promises.",
  "The most critical infrastructure runs on an old Debian server nobody wants to touch.",
  "If you don't define your timeout, the network will define it for you. Poorly.",
  "A 200 OK status code means the server received your request, not that it actually did what you wanted.",
  "Cryptography is like a blender. Don't try to build your own; just use the one you bought.",
  "The hardest bugs to fix are the ones that only happen on Tuesdays.",
  "Your commit message should explain the problem you solved, not the code you wrote.",
  "If it requires a 10-step manual process to restart, it's not a service; it's a liability.",
  "Monitoring tells you the system is broken. Observability tells you why.",
  "Just because you *can* put it in a Docker container doesn't mean you *should*.",
  "The database is the ultimate source of truth. The cache is just a highly confident rumor.",
  "A fast response with stale data is often better than a slow response with perfect data.",
  "Never test your error handling in production. Production will test it for you.",
  "The best security feature is deleting data you no longer need.",
  "If your system design requires a perfectly synchronized distributed clock, redesign it.",
  "Complexity is a tax you pay upfront. Simplicity is a tax you pay forever in refactoring.",
  "The easiest code to debug is the code that doesn't exist.",
  "A slow database query is just a DDoS attack you launch against yourself.",
  "Don't build an ecosystem when all you needed was a script.",
  "If your microservices share a database, they aren't microservices. They are a distributed monolith.",
  "The ultimate goal of software engineering is to make yourself obsolete through automation.",
  "You can either have two pizza teams, or a team that takes two years to ship.",
  "If the system works perfectly the first time, you haven't tested it hard enough.",
  "A string is not a date. Stop treating it like one.",
  "The most expensive phase of software development is maintenance. Write readable code.",
  "Always sanitize your inputs. Little Bobby Tables is always watching.",
  "If your deployment takes more than 15 minutes, you are deploying fear.",
  "The best engineers don't know all the answers; they just know how to read the stack trace.",
  "There is no cloud. It's just someone else's computer.",
  "State is the root of all evil in distributed systems.",
  "If you don't test your disaster recovery, you don't have disaster recovery.",
  "Caching is a band-aid for bad queries. Fix the query first.",
  "A microservice architecture is just a monolith connected by network latency.",
  "The best time to add a database index was 6 months ago. The second best time is now.",
  "If your architecture relies on 'hoping it doesn't crash', it will crash.",
  "Vertical scaling is buying a bigger server. Horizontal scaling is building a smarter system.",
  "Don't mock the database in your tests. Test against the real thing, or don't test at all.",
  "A fast bad decision is usually better than a slow perfect one. You can revert code.",
  "Read-heavy systems need cache. Write-heavy systems need queues.",
  "You cannot scale a bottleneck. You can only move it.",
  "JSON is heavy. If speed is critical, use Protocol Buffers or gRPC.",
  "Always assume the external API you are calling is currently on fire.",
  "Eventual consistency means it will be consistent... eventually. Plan for the gap.",
  "If it’s not in version control, it doesn't exist.",
  "The hardest part of software engineering isn't writing code. It's understanding the requirements.",
  "Every system is legacy code the moment it hits production.",
  "Don't build your own authentication system. Just don't.",
  "A 99.9% uptime SLA still allows for 43 minutes of downtime a month.",
  "Your CI/CD pipeline is a product. Treat it with the same respect as your codebase.",
  "The only secure system is one that is powered off, cast in concrete, and sealed in a lead room.",
  "Technical debt isn't bad unless you never pay the interest.",
  "Do not use floats for currency. Ever.",
  "The user doesn't care about your tech stack. They care if the button works.",
  "Redundancy is expensive. Downtime is bankrupting.",
  "Any system that depends on human memory is fundamentally broken.",
  "Optimizing code before profiling it is like performing surgery in the dark.",
  "If you can't monitor it, you can't manage it.",
  "A good engineer knows how to build complex systems. A great engineer knows how to avoid them.",
  "Your database schema is your application's destiny.",
  "Always set a timeout on network requests. Infinite hangs are the enemy of throughput.",
  "The most expensive code is the code you write twice.",
  "Idempotency is the secret to safe retries in payment systems.",
  "A single point of failure is a ticking time bomb.",
  "Logging 'An error occurred' is a crime against your future self.",
  "Separation of concerns isn't just for code; it's for infrastructure too.",
  "If your deployment requires a 10-page manual, your deployment process is broken.",
  "WebSockets are cheap. HTTP polling is expensive.",
  "Never trust user input. Never trust third-party input. Sometimes, don't even trust your own database.",
  "The larger the pull request, the less likely it is to be properly reviewed.",
  "An undocumented API is basically a locked safe with no key.",
  "Your background workers will fail. Design them so they can fail safely.",
  "You don't need Kubernetes for your side project.",
  "Bandwidth is cheap. Latency is physical. You can't bribe the speed of light.",
  "If you have to explain the joke, it's a bad joke. If you have to comment the code, it's bad code.",
  "A transaction rollback is a feature, not a bug.",
  "The network layer will lie to you.",
  "Hardware eventually fails. Software eventually works.",
  "Build for the user. Optimize for the machine. Architect for the team."
];

// 10 distinct Framer Motion variants
const variantsMap: Record<number, any> = {
  0: { // The Train (Slide from right)
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } }
  },
  1: { // Matrix Glitch
    initial: { opacity: 0, skewX: 20 },
    animate: { opacity: [0, 0.8, 0, 1, 0, 1], skewX: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 0.95 }
  },
  2: { // Blur Reveal
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1 } },
    exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } }
  },
  3: { // Ghost Slide
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -20 }
  },
  4: { // Scale Pop
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
    exit: { opacity: 0, scale: 0.9 }
  },
  5: { // Horizontal Wipe (Simulated with clipPath)
    initial: { clipPath: 'inset(0 100% 0 0)' },
    animate: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { opacity: 0 }
  },
  6: { // Flip Down
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, rotateX: 90 }
  },
  7: { // Elastic Drop
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 500, damping: 10 } },
    exit: { opacity: 0, y: 50 }
  },
  8: { // Slow Fade
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 0.8 } }
  },
  9: { // Zoom Out
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9 }
  }
};

const CorePhilosophy: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cycleQuote = (direction: 'next' | 'prev') => {
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % engineeringTruthsVol2.length;
      } else {
        return (prev - 1 + engineeringTruthsVol2.length) % engineeringTruthsVol2.length;
      }
    });
    setAnimIndex(Math.floor(Math.random() * 10));
  };

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      cycleQuote('next');
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <div className="core-philosophy-section">
      <h3 className="card-title mono-text core-header">// CORE_PHILOSOPHY</h3>

      <div
        className="core-philosophy-holograph flex flex-col gap-6 md:flex-row"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="holograph-bracket left mono-text">[</span>
        <span className="holograph-bracket right mono-text">]</span>

        <button
          className="stealth-nav-btn prev-btn"
          onClick={() => cycleQuote('prev')}
          aria-label="Previous quote"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          className="stealth-nav-btn next-btn"
          onClick={() => cycleQuote('next')}
          aria-label="Next quote"
        >
          <ChevronRight size={32} />
        </button>

        <div className="quote-container border-b border-white/5 pb-4 md:border-b-0 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={variantsMap[animIndex]}
              initial="initial"
              animate="animate"
              exit="exit"
              className="philosophy-text mono-text"
              style={{ transformOrigin: 'center' }}
            >
              {engineeringTruthsVol2[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CorePhilosophy;
