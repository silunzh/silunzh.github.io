(function () {
  document.documentElement.classList.add("js");

  function setTemporaryLabel(button, label) {
    const original = button.dataset.originalLabel || button.textContent;
    button.dataset.originalLabel = original;
    button.textContent = label;
    window.setTimeout(function () {
      button.textContent = original;
    }, 1400);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopyText(text);
      });
    }

    return fallbackCopyText(text);
  }

  function fallbackCopyText(text) {
    let copied = false;
    const handler = function (event) {
      event.clipboardData.setData("text/plain", text);
      event.preventDefault();
      copied = true;
    };

    document.addEventListener("copy", handler);
    try {
      if (document.execCommand("copy") && copied) {
        return Promise.resolve();
      }
    } catch (error) {
      copied = false;
    } finally {
      document.removeEventListener("copy", handler);
    }

    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.focus();
    field.select();
    field.setSelectionRange(0, field.value.length);

    try {
      if (!document.execCommand("copy")) {
        throw new Error("Copy command was not accepted.");
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      document.body.removeChild(field);
    }
  }

  function bindCopyButton(button) {
    button.addEventListener("click", function () {
      copyText(getCopyText(button)).then(
        function () {
          setTemporaryLabel(button, "Copied");
        },
        function () {
          setTemporaryLabel(button, "Copy failed");
        }
      );
    });
  }

  function getCopyText(button) {
    const targetId = button.dataset.copyTarget;
    if (targetId) {
      const target = document.getElementById(targetId);
      return target ? target.textContent.trim() : "";
    }

    return button.dataset.copy || "";
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    bindCopyButton(button);
  });

  document.querySelectorAll("[data-copy-target]").forEach(function (button) {
    bindCopyButton(button);
  });

  const publicationBibtex = {
    P8: `@misc{vasileiou2026noregret,
  title = {{A No-Regret Framework for Adaptive Incentive Design}},
  author = {Vasileiou, G. and Zhang, L. and Zhang, S.},
  year = {2026},
  eprint = {2606.02529},
  archivePrefix = {arXiv},
  url = {https://arxiv.org/abs/2606.02529}
}`,
    P7: `@misc{sheng2026hyperedge,
  title = {{Hyperedge approximation for stochastic processes on higher-order networks}},
  author = {Sheng, A. and McAvoy, A. and Tian, Y. and Zhang, S. and Fontan, A. and Plotkin, J. B.},
  year = {2026},
  eprint = {2605.23444},
  archivePrefix = {arXiv},
  url = {https://arxiv.org/abs/2605.23444}
}`,
    P6: `@misc{vasileiou2026incentive,
  title = {{Incentive Design without Hypergradients: A Social-Gradient Method}},
  author = {Vasileiou, G. and Zhang, L. and Zhang, S.},
  year = {2026},
  eprint = {2604.11346},
  archivePrefix = {arXiv},
  url = {https://arxiv.org/abs/2604.11346}
}`,
    P5: `@misc{zhang2026stochastic,
  title = {{Stochastic Adaptive Control for Systems with Nonlinear Parameterization: Almost Sure Stability and Tracking}},
  author = {Zhang, L. and Wahlberg, B. and Zhang, S.},
  year = {2026},
  eprint = {2604.06980},
  archivePrefix = {arXiv},
  url = {https://arxiv.org/abs/2604.06980}
}`,
    P4: `@misc{vasileiou2026adaptive,
  title = {{Adaptive Incentive Design with Regret Minimization}},
  author = {Vasileiou, G. and Zhang, L. and Zhang, S.},
  year = {2026},
  eprint = {2604.05977},
  archivePrefix = {arXiv},
  url = {https://arxiv.org/abs/2604.05977}
}`,
    P3: `@misc{fernando2025stochastic,
  title = {{Stochastic Prize-Collecting Games: Strategic Planning in Multi-Robot Systems}},
  author = {Fernando, M. and {\\\"O}gren, P. and Zhang, S.},
  year = {2025},
  eprint = {2510.24515},
  archivePrefix = {arXiv},
  url = {https://arxiv.org/abs/2510.24515}
}`,
    P2: `@misc{zhang2025online,
  title = {{Online learning for nonlinear dynamical systems without the iid condition}},
  author = {Zhang, L. and Zhang, S.},
  year = {2025},
  eprint = {2504.02995},
  archivePrefix = {arXiv},
  url = {https://arxiv.org/abs/2504.02995}
}`,
    P1: `@misc{zhang2021network,
  title = {{Network Consensus with Privacy: A Secret Sharing Method}},
  author = {Zhang, S. and Timoudas, T. and Dahleh, M.},
  year = {2021},
  eprint = {2103.03432},
  archivePrefix = {arXiv},
  url = {https://arxiv.org/abs/2103.03432}
}`,
    J8: `@article{huang2026safe,
  title = {{Safe Reinforcement Learning for Multi-Agent Systems Based on Relative-Degree Decoupling}},
  author = {Huang, D. and Sun, Y. and Zhang, S.},
  journal = {IEEE/CAA Journal of Automatica Sinica},
  year = {2026}
}`,
    J7: `@article{timoudas2023general,
  title = {{A General Framework to Distribute Iterative Algorithms with Localized Information over Networks}},
  author = {Timoudas, T. and Zhang, S. and Magnusson, S. and Fischione, C.},
  journal = {IEEE Transactions on Automatic Control},
  volume = {68},
  number = {12},
  pages = {7358--7373},
  year = {2023},
  url = {https://ieeexplore.ieee.org/abstract/document/10135147}
}`,
    J6: `@article{zhang2021modeling,
  title = {{Modeling collective behaviors: A moment-based approach}},
  author = {Zhang, S. and Ringh, A. and Hu, X. and Karlsson, J.},
  journal = {IEEE Transactions on Automatic Control},
  volume = {66},
  number = {1},
  pages = {33--48},
  year = {2021},
  url = {https://ieeexplore.ieee.org/document/9013036}
}`,
    J5: `@article{zhang2021intrinsic,
  title = {{An intrinsic approach to formation control of regular polyhedra for reduced attitudes}},
  author = {Zhang, S. and He, F. and Hong, Y. and Hu, X.},
  journal = {Automatica},
  volume = {111},
  pages = {108619},
  year = {2021},
  url = {https://arxiv.org/abs/1805.07823}
}`,
    J4: `@article{zhang2021consensus,
  title = {{Consensus with preserved privacy against neighbor collusion}},
  author = {Zhang, S. and Timoudas, T. and Dahleh, M.},
  journal = {Control Theory and Technology},
  volume = {18},
  number = {4},
  pages = {409--418},
  year = {2021},
  url = {https://arxiv.org/abs/2011.09646}
}`,
    J3: `@article{zhang2019intrinsic,
  title = {{Intrinsic tetrahedron formation of reduced attitude}},
  author = {Zhang, S. and Song, W. and He, F. and Hong, Y. and Hu, X.},
  journal = {Automatica},
  volume = {87},
  pages = {375--382},
  year = {2019},
  doi = {10.1016/j.automatica.2017.10.023}
}`,
    J2: `@article{wei2019finite,
  title = {{Finite-time attitude synchronization with distributed discontinuous protocols}},
  author = {Wei, J. and Zhang, S. and Adaldo, A. and Thunberg, J. and Hu, X. and Johansson, K.},
  journal = {IEEE Transactions on Automatic Control},
  volume = {63},
  number = {10},
  pages = {3608--3615},
  year = {2019},
  url = {https://ieeexplore.ieee.org/document/8267247}
}`,
    J1: `@article{song2018intrinsic,
  title = {{Intrinsic reduced attitude formation with ring inter-agent graph}},
  author = {Song, W. and Markdahl, J. and Zhang, S. and Hu, X. and Hong, Y.},
  journal = {Automatica},
  volume = {85},
  pages = {193--201},
  year = {2018},
  doi = {10.1016/j.automatica.2017.07.015}
}`,
    C15: `@inproceedings{vanweerelt2026self,
  title = {{Self-Identifying Internal Model-Based Online Optimization}},
  author = {{van Weerelt}, W. J. A. and Zhang, L. and Zhang, S. and Bastianello, N.},
  booktitle = {IFAC 2026},
  year = {2026},
  url = {https://arxiv.org/abs/2511.20411}
}`,
    C14: `@inproceedings{vasileiou2026adaptiveecc,
  title = {{Adaptive Incentive Design with Regret Minimization}},
  author = {Vasileiou, G. and Zhang, L. and Zhang, S.},
  booktitle = {European Control Conference (ECC)},
  year = {2026},
  url = {https://arxiv.org/abs/2604.05977}
}`,
    C13: `@inproceedings{fontan2025collective,
  title = {{Collective decision-making dynamics in hypernetworks}},
  author = {Fontan, A. and Zhang, S.},
  booktitle = {2025 IEEE 64th Conference on Decision and Control (CDC)},
  pages = {6222--6227},
  publisher = {IEEE},
  year = {2025}
}`,
    C12: `@inproceedings{zhang2018moment,
  title = {{A moment-based approach to modeling collective behaviors}},
  author = {Zhang, S. and Ringh, A. and Hu, X. and Karlsson, J.},
  booktitle = {2018 IEEE Conference on Decision and Control (CDC)},
  pages = {1681--1687},
  publisher = {IEEE},
  year = {2018}
}`,
    C11: `@inproceedings{zhang2018exponential,
  title = {{Exponential stability of formations for reduced attitudes: A coordinates free approach}},
  author = {Zhang, S. and He, F. and Hu, X.},
  booktitle = {2018 37th Chinese Control Conference (CCC)},
  pages = {7215--7220},
  publisher = {IEEE},
  year = {2018}
}`,
    C10: `@inproceedings{wei2017finite,
  title = {{Finite-time attitude synchronization with a discontinuous protocol}},
  author = {Wei, J. and Zhang, S. and Adaldo, A. and Hu, X. and Johansson, K.},
  booktitle = {2017 13th IEEE International Conference on Control and Automation (ICCA)},
  pages = {192--197},
  publisher = {IEEE},
  year = {2017}
}`,
    C9: `@inproceedings{zhang2017intrinsic,
  title = {{Intrinsic formation control of regular polyhedra for reduced attitudes}},
  author = {Zhang, S. and He, F. and Hong, Y. and Hu, X.},
  booktitle = {2017 IEEE 56th Annual Conference on Decision and Control (CDC)},
  pages = {1002--1007},
  publisher = {IEEE},
  year = {2017}
}`,
    C8: `@inproceedings{zhang2017spherical,
  title = {{Spherical formation of regular tetrahedra}},
  author = {Zhang, S. and He, F. and Yao, Y. and Hu, X.},
  booktitle = {2017 36th Chinese Control Conference (CCC)},
  pages = {1317--1322},
  publisher = {IEEE},
  year = {2017}
}`,
    C7: `@inproceedings{zhang2016spherical,
  title = {{Spherical cyclic formation control}},
  author = {Zhang, S. and Song, W. and He, F. and Yao, Y. and Hu, X.},
  booktitle = {2016 35th Chinese Control Conference (CCC)},
  pages = {8207--8212},
  publisher = {IEEE},
  year = {2016}
}`,
    C6: `@article{mou2015formation,
  title = {{Formation tracking based on target points}},
  author = {Mou, S. and He, F. and Zhang, S.},
  journal = {IFAC-PapersOnLine},
  volume = {48},
  number = {28},
  pages = {921--926},
  year = {2015}
}`,
    C5: `@inproceedings{ma2015finite,
  title = {{Finite time dynamical formation control of multi-agent systems}},
  author = {Ma, L. and He, F. and Sun, C. and Wang, L. and Zhang, S. and Yao, Y.},
  booktitle = {2015 34th Chinese Control Conference (CCC)},
  pages = {7398--7403},
  publisher = {IEEE},
  year = {2015}
}`,
    C4: `@article{zhang2015target,
  title = {{Target recognition in the terminal guidance process: A novel algorithm for resource allocation}},
  author = {Zhang, S. and He, F. and Yao, Y.},
  journal = {IFAC-PapersOnLine},
  volume = {48},
  number = {28},
  pages = {835--840},
  year = {2015}
}`,
    C3: `@inproceedings{yang2014analysis,
  title = {{Analysis and modeling of terminal guidance system for a flight vehicle with side-window detection}},
  author = {Yang, B. and Zheng, T. and Zhang, S. and Yao, Y.},
  booktitle = {Proceedings of the 33rd Chinese Control Conference},
  pages = {1051--1056},
  publisher = {IEEE},
  year = {2014}
}`,
    C2: `@inproceedings{zhang2014lowspeed,
  title = {{Low-speed performance analysis and design of velocity servo control system}},
  author = {Zhang, S. and He, F. and Yao, Y. and Wu, J. and Li, L.},
  booktitle = {Proceedings of the 33rd Chinese Control Conference},
  pages = {8000--8005},
  publisher = {IEEE},
  year = {2014}
}`,
    C1: `@inproceedings{di2014comparison,
  title = {{Comparison on the anti-windup control methods of air-breathing hypersonic vehicle}},
  author = {Di, X. and Hao, C. and Che, J. and Tan, Z. and Zhang, S.},
  booktitle = {Proceedings of the 33rd Chinese Control Conference},
  pages = {686--691},
  publisher = {IEEE},
  year = {2014}
}`
  };

  document.querySelectorAll(".pub-list li").forEach(function (item) {
    const tag = item.querySelector(".tag");
    if (!tag) return;

    const key = tag.textContent.trim();
    const bibtex = publicationBibtex[key];
    if (!bibtex) return;

    const action = document.createElement("span");
    action.className = "pub-actions js-only";

    const button = document.createElement("button");
    button.className = "text-button pub-copy";
    button.type = "button";
    button.dataset.copy = bibtex;
    button.textContent = "Copy BibTeX";
    button.setAttribute("aria-label", "Copy BibTeX for " + key);
    bindCopyButton(button);

    action.appendChild(button);
    item.appendChild(document.createTextNode(" "));
    item.appendChild(action);
  });

  const newsSection = document.querySelector("[data-news-section]");
  if (newsSection) {
    const filter = newsSection.querySelector("[data-news-filter]");
    const toggle = newsSection.querySelector("[data-news-toggle]");
    const empty = newsSection.querySelector("[data-news-empty]");
    const items = Array.from(newsSection.querySelectorAll("[data-news-list] > li"));
    const limit = 8;
    let expanded = false;

    function updateNews() {
      const query = filter ? filter.value.trim().toLowerCase() : "";
      let visible = 0;

      items.forEach(function (item, index) {
        const matches = !query || item.textContent.toLowerCase().includes(query);
        const withinLimit = expanded || query || index < limit;
        const shouldShow = matches && withinLimit;
        item.hidden = !shouldShow;
        if (shouldShow) visible += 1;
      });

      if (empty) empty.hidden = visible !== 0;
      if (toggle) {
        toggle.hidden = Boolean(query) || items.length <= limit;
        toggle.textContent = expanded ? "Show recent" : "Show all";
      }
    }

    if (filter) {
      filter.addEventListener("input", updateNews);
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        expanded = !expanded;
        updateNews();
      });
    }

    updateNews();
  }

  function ensureScrollProgress() {
    let progress = document.querySelector("[data-scroll-progress]");
    if (!progress) {
      progress = document.createElement("div");
      progress.className = "scroll-progress js-only";
      progress.dataset.scrollProgress = "";
      document.body.prepend(progress);
    }
    return progress;
  }

  function ensureScrollTop() {
    let button = document.querySelector("[data-scroll-top]");
    if (!button) {
      button = document.createElement("button");
      button.className = "scroll-top js-only";
      button.type = "button";
      button.textContent = "Top";
      button.dataset.scrollTop = "";
      button.setAttribute("aria-label", "Back to top");
      document.body.appendChild(button);
    }
    return button;
  }

  const progress = ensureScrollProgress();
  const topButton = ensureScrollTop();

  function updateScrollTools() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollMax > 0 ? Math.min(1, Math.max(0, scrollTop / scrollMax)) : 0;
    progress.style.transform = "scaleX(" + ratio + ")";
    topButton.classList.toggle("is-visible", scrollTop > 520);
  }

  topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateScrollTools, { passive: true });
  window.addEventListener("resize", updateScrollTools);
  updateScrollTools();
})();
