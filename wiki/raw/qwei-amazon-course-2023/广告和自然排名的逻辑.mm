
<map>
  <node ID="root" TEXT="广告和自然排名的逻辑">
    <node TEXT="流量分配：赛马" ID="f5f6217fbb8abd52646bfa8dd795da74" STYLE="bubble" POSITION="right">
      <node TEXT="收益最大化：对搜索结果进行合理的排序" ID="cdaac02cea8d1cb5c18c605e7508b43d" STYLE="fork"/>
      <node TEXT="马太效应：表现越好，排名越靠前，流量越多" ID="e8fc5735ff362a4a1bbc597255101c69" STYLE="fork"/>
      <node TEXT="ecpm=1000*收益=1000*ctr*cvr*price" ID="6f9b5de75d31d36518b2535ea2c88947" STYLE="fork"/>
    </node>
    <node TEXT="自然流量分配的逻辑" ID="069c23d957fb6a10acbea61f57112d5d" STYLE="bubble" POSITION="right">
      <node TEXT="ecpm越高，排名越靠前" ID="342ce4f2e0b0ae42cb79005f3f6987e8" STYLE="fork"/>
      <node TEXT="影响ecpm的最核心要素：CTR和CVR" ID="f7783dfea08c56cc0c957125aebe4f13" STYLE="fork">
        <node TEXT="这里的CTR和CVR，是搜索算法对listing的CTR和CVR做的一个预估模型，然后根据最近时间段的CTR和CVR等数据，对下一次点击概率和转化概率做一个预估。这两个值越高，排名越高，流量越大" ID="cf0cd7b17555a6d0555e0b1a19ce1289" STYLE="fork"/>
        <node TEXT="影响CTR和CVR期望值的，最主要是因素是最近七天，最近一个月，最近半年，最近一年等实际的点击率和转化率。" ID="2fbe4d37fc29e109fe16d499f8de1a59" STYLE="fork">
          <node TEXT="时间越近，权重越高" ID="cd862183f898c9f7c99e11f741d49e05" STYLE="fork">
            <node TEXT="历史权重" ID="58eab8e16060cf7b88c795ff836ce6af" STYLE="fork"/>
            <node TEXT="近期权重" ID="6b2ae0fe354c2b2c69f3b04ff55a74c4" STYLE="fork"/>
          </node>
          <node TEXT="数据量越大，权重越高" ID="11fde8b7689d643d9325a3840f4534b1" STYLE="fork">
            <node TEXT="数据量越大，预估模型做出判断的风险越小，预估越准，因此给予的权重就越高" ID="1a8d8c430579a7961d04a0c95a1165fa" STYLE="fork"/>
            <node TEXT="当数据量大到一个量级，更低的点击率和转化率，反而给的分数更高，因为风险系数更小" ID="d8b079225c465699a04e5f1e2929cd6f" STYLE="fork"/>
          </node>
          <node TEXT="老产品存在历史权重，数据量更大，因此整体权重更高。假如停广告时间太久，或者后来的新品冲击过猛，近期的数据量（点击数和转化数）和质量（点击率和转化率）远大于所谓老品， 那么老品的关键词也会不稳定。" ID="1bda52ebdb4cfab366d10736b93ff88b" STYLE="fork">
            <node TEXT="破除老品流量护城河的两大法宝：力大砖飞；差异化款或者低价带来的超高点击率和转化率" ID="2b1f2ade4bb16762489a8e1317f7e172" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="实际点击率和转化率短期看是波动的，长期看维持一个均值，除非市场环境发生剧烈变化。ecpm也是根据你的近期点击率和转化率去评估这个值，再通过数据量做一个系数去加权平均。" ID="63a56901be8c5b7b58696f8f7ecfedbf" STYLE="fork"/>
      </node>
      <node TEXT="常规的搜索，广告搜索算法，都是以这个为蓝本进行设计，但是因为点击率和转化率预估模型里又存在非常复杂的参数考量，因此是非常复杂的。" ID="78e4c3b7b7cf8722a833a33475ea5ea3" STYLE="fork">
        <node TEXT="常见的影响点击率的因子" ID="e809436a8c9ad4237fe77bbf825cabcf" STYLE="fork">
          <node TEXT="主图" ID="a1bc2977b03a9fb8546e89499ae19eb3" STYLE="fork"/>
          <node TEXT="价格" ID="bdcda973250c389606f2bdbab79bc860" STYLE="fork"/>
          <node TEXT="ratings数量和星级" ID="d2ce2e1e76da99a399f2f34db5ab4614" STYLE="fork"/>
          <node TEXT="ac和bsr" ID="dc80e5520a8e1bff810b4c21458d8d9e" STYLE="fork"/>
          <node TEXT="时效" ID="bec45ec03f63442fd6efacec7d1c92c6" STYLE="fork"/>
        </node>
        <node TEXT="常见的影响转化率的因子" ID="e6cd4a8e6e3b65d26fd18017bbc0bd9d" STYLE="fork">
          <node TEXT="价格以及衍生的促销" ID="8b457e5267003483356734d7c4f3043c" STYLE="fork"/>
          <node TEXT="review，特别是差评和首页评论" ID="6b293691fa06418cd675b8f805d496d8" STYLE="fork"/>
          <node TEXT="视觉" ID="744789fece7ffb7a79d982933bd68749" STYLE="fork"/>
          <node TEXT="文案和QA" ID="cc20130eb1f9e8f3d1c2e2b999fdd90c" STYLE="fork"/>
          <node TEXT="变体和流量包围" ID="607bc232e72853ff03fd91c23283ac6b" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="常说的相关性，如何判定" ID="b838de6729bac0660941a1f8fb18a152" STYLE="fork">
        <node TEXT="搜索词和listing文案的匹配" ID="61de279d69b4620e03ee9344ef379198" STYLE="fork"/>
        <node TEXT="ASIN与ASIN之间的匹配" ID="9bf7ee4f30c37965a0922fd486c6e285" STYLE="fork"/>
        <node TEXT="匹配基础上的质：点击率和转化率" ID="e378fcb94d246d140ce9baf4e7b0a994" STYLE="fork"/>
        <node TEXT="匹配基础上的量：点击量和订单数" ID="14f35ffb73feb7f3477f80b7a78762ee" STYLE="fork"/>
      </node>
    </node>
    <node TEXT="付费流量分配的逻辑" ID="9b19124357128e78d07a8a713c347828" STYLE="bubble" POSITION="right">
      <node TEXT="自然流量分配的基础上，增加了bid，并对不同的参数权重进行微调，且bid是最大的权重参考。" ID="347cd93c3a2a306e58378772281956cc" STYLE="fork"/>
    </node>
    <node TEXT="自然流量和付费流量之间的联动关系" ID="cccedc9207d84307ddabf8a537f4e8cd" STYLE="bubble" POSITION="right">
      <node TEXT="自然流量增长需要：更高的转化率和点击率，更多的订单和点击数" ID="07f2c6c299232486293fde6604c99478" STYLE="fork"/>
      <node TEXT="广告提供的：额外的曝光量；更加精准的流量，带来的短期内更稳定的转化率和点击率" ID="6d8e229ec3142333a1483e7136d60b9c" STYLE="fork"/>
      <node TEXT="推关键词，一定要打那个词吗？" ID="e735b95f3e8e94eb79f5882b49acd067" STYLE="fork">
        <node TEXT="没有进行投放广告的词，为什么也能获得不错的关键词排名？" ID="b4274df2a3fd8421eb72abd5295fc77b" STYLE="fork"/>
        <node TEXT="没有进行广告投放，为什么也能获得较好的关键词排名？" ID="21fdd34b5251318d8b61c7f8275a1ef4" STYLE="fork"/>
        <node TEXT="站外放量，能推关键词吗？" ID="976bf920fdf4846896a69842bf3430d8" STYLE="fork"/>
        <node TEXT="广告投放关键词和关键词排名之间的关系到底是什么？" ID="aa0dc672c5d70f04cfb5a3ebf1a46b3b" STYLE="fork"/>
      </node>
      <node TEXT="广告的基本目的：理想情况下，一个周期内，毛利率大于等于acos的前提下，尽可能的拿到最多的数据量；中等情况下，毛利率大于等于T-acos（广告花费占总销售额的比例）的前提下，尽可能的拿到更多的数据量；最坏情况下，在可承受的亏损限额内，尽可能的拿到更多的数据量，然后慢慢把acos或者t-acos控制在前两种情况" ID="3da0a988b31453f000751546d9a3a3dd" STYLE="fork">
        <node TEXT="因此，广告的最核心，就是控acos，上预算。" ID="0e433a058fd6547bafb5e9c3110ab2df" STYLE="fork"/>
        <node TEXT="所有的操作，都是为了迎合这个广告目的，不管是提高竞价或者降低产品价格拿到更高的转化率，还是降低bid或者提高价格控制acos平衡线。" ID="70bde7f5252afd694f00a3416fa5f561" STYLE="fork">
          <node TEXT="要找到这个平衡线，需要进行大量的测试，测什么？" ID="d73164d981cd713b698eb48872c3aae9" STYLE="fork">
            <node TEXT="不同投放的平均acos" ID="13b71c9acbcca882c848892ee7a4f58a" STYLE="fork"/>
            <node TEXT="不同bid的平均acos" ID="a5674fded12d5507554f8eaa1eb0b3e8" STYLE="fork"/>
            <node TEXT="不同价格下的平均acos" ID="cac0b615a8a0fe43bcd31330a3359c95" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="新品推广不看acos？" ID="49b0487818f45b4e15a6c13e787a70ec" STYLE="fork">
          <node TEXT="错，只是对高acos容忍度更高" ID="041a6afc45ae2848a85035769798934e" STYLE="fork"/>
        </node>
      </node>
    </node>
    <node TEXT="如何降低广告花费占比？" ID="f8f0164656cad92aa5c488e08cb101a7" STYLE="bubble" POSITION="right">
      <node TEXT="降低广告流量占比" ID="8d346139f7f560bfe04c5718bdf4e7da" STYLE="fork">
        <node TEXT="提升自然关键词搜索排名" ID="3893b2a7fdede6074076e1c7d6c6968e" STYLE="fork"/>
        <node TEXT="提升关联流量的分布" ID="10ffa7aaa20c8208ba308c40d9abe8ea" STYLE="fork"/>
      </node>
      <node TEXT="降低CPC" ID="4e55ceda3db57bd380328c19a3166246" STYLE="fork">
        <node TEXT="自动降bid：提高相关性" ID="921afad157fe879bd6d6ac779bac4bb5" STYLE="fork"/>
        <node TEXT="强行降bid，通过更多的投放稀释，降低综合cpc" ID="493d83e1809ba58990b8e46c76832918" STYLE="fork"/>
      </node>
    </node>
  </node>
</map>