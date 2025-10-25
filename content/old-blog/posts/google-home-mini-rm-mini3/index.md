---
title: "格安でスマートホームに【Google Home mini&RM mini3】"
date: 2018-05-06
categories: 
  - "life"
tags: 
  - "google-home"
  - "rm-mini3"
  - "スマートスピーカー"
  - "スマートホーム"
coverImage: "GoogleHomeMini.jpg"
---

流行りに乗っかり、我が家でもGoogle Homeを使ったスマートホーム化をしてみました。そして合わせて、**赤外線リモコン**で操作する家電も**音声操作**できるようにしました！ので、ここに手順を残そうと思います。

### はじめに

初めに断っておきますが、今回は費用を極力抑えたため、手順が結構複雑、かつ、面倒になっていますので、覚悟はしておいてください。そのかわり、私の金額実績としては、5000円を切る、4647円（\[note\]内訳は、Google Home mini：3240円（某家電量販店で5000円以上同時購入でのセール価格）とRM mini3：1407円([Lightinthebox.com](https://www.lightinthebox.com/ja/p/new-upgrade-version-broadlink-rm-mini-3-black-bean-smart-home-wifi-universal-ir-smart-remote-controller_p5528626.html?currency=JPY&litb_from=paid_adwords_shopping&sku=1_45&country_code=jp&utm_source=google_shopping&utm_medium=cpc&adword_mt=&adword_ct=200282432562&adword_kw=&adword_pos=1o1&adword_pl=&adword_net=g&adword_tar=&adw_src_id=3538328649_856153415_46159232569_pla-326193056793&gclid=Cj0KCQjwrLXXBRCXARIsAIttmRMDqrS421VkBOGNNJOzb3HsW53jm9E9CWnMXbP4ZqW5sZOeFsdoy78aAuDXEALw_wcB))\[/note\]）でした。

### 準備するもの

- Google Home mini Google製のスマートスピーカー。同Google Home（約15000円）もあるが、機能は全く一緒。違いはスピーカ性能のみです。miniで音楽かけて使っていたりしますが、私は音質が悪いと感じることはなかったです。
- RM mini3 通称黒豆。白いeRemoteは販売店が違い値段が2～3倍違う。赤外線リモコンで動作する家電を登録し、Google Homeと連携と連携できるようにするもの。Google HomeはblutoothやWi-Fi接続された機器しか認識できないため、何かしらのこういった機器が必要。
- 2.4GHz対応のWi-Fiルータ 上述のRM mini3が2.4GHz帯しか対応していないためです。ただ、結構古くから2.4GHz帯対応のルータがほとんどなのでおそらく大丈夫ですが事前に確認を。
- Android 端末 RM mini3を操作するアプリを入れる必要があります。
- USB→コンセント変換器 RM mini3にはUSBケーブルしかついていないので、USBをコンセントプラグに変換して給電させる必要があります。

[![](images/sokuteikiya_gh-ch-mini)](//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3397016&pid=885197291&vc_url=https%3A%2F%2Fstore.shopping.yahoo.co.jp%2Fsokuteikiya%2Fgh-ch-mini.html&vcptn=kaereba)

[Google Home Mini](//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3397016&pid=885197291&vc_url=https%3A%2F%2Fstore.shopping.yahoo.co.jp%2Fsokuteikiya%2Fgh-ch-mini.html&vcptn=kaereba)

posted with [カエレバ](http://kaereba.com)

測定器屋 ヤフー店

[Yahooショッピング![](images/gifbanner)](//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3397016&pid=885197291&vc_url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DGoogle%2520Home%2520mini&vcptn=kaereba)

[楽天市場](//af.moshimo.com/af/c/click?a_id=1041250&p_id=54&pc_id=54&pl_id=616&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGoogle%2520Home%2520mini%2F-%2Ff.1-p.1-s.1-sf.0-st.A-v.2%3Fx%3D0)![](images/impression)

[![](images/31zkSvD8nEL._SL160_.jpg)](//af.moshimo.com/af/c/click?a_id=1041250&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2FB075RRVWBD%2Fref%3Dnosim)![](images/impression)

[Broadlink Wifi 赤外線 学習 リモコン RM mini3 \[並行輸入品\]](//af.moshimo.com/af/c/click?a_id=1041250&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2FB075RRVWBD%2Fref%3Dnosim)![](images/impression)

posted with [カエレバ](http://kaereba.com)

Broadlink

[Amazon](//af.moshimo.com/af/c/click?a_id=1041250&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3DBroadlink%2520RM%2520mini3%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A)![](images/impression)

[楽天市場](//af.moshimo.com/af/c/click?a_id=1041250&p_id=54&pc_id=54&pl_id=616&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FBroadlink%2520RM%2520mini3%2F-%2Ff.1-p.1-s.1-sf.0-st.A-v.2%3Fx%3D0)![](images/impression)

[Yahooショッピング![](images/gifbanner)](//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3397016&pid=885197291&vc_url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DBroadlink%2520RM%2520mini3&vcptn=kaereba)

### セットアップ手順

#### Google Home

① Google Homeを電源につなぎます。 声が届きやすい＆音が聞こえやすい場所に設置しましょう。

② Google Homeアプリをダウンロードします。 [![Google Play で手に入れよう](images/ja_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.google.android.apps.chromecast.app&hl=ja&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

③ Google Homeアプリのセットアップ。 この時、インストールするスマホはWi-Fi接続しておいてください。

まず開始を押します。 ![](images/2018-05-05_21h36_01-174x300.png)

紐づけたいアカウントを選択してOKを押します。もしGoogleアカウントを持っていなければここで作成する必要があります。

![](images/2018-05-05_21h39_49-174x300.png)

簡単でしたね。これで一旦はセットアップ終了です。「OK Google、こんにちは」とでも話しかけてみて動作確認してください。

### RM mini3

① RM mini3を電源につなぎます。 USBケーブルしか同梱されていないので、変換するなどしてコンセントから接続するとよいでしょう。PCとつなぎっぱなしでもいいよという方はPCのUSBに挿してもいいと思います。

② 野良アプリをインストールします。 新しいバージョンだと、日本国内向けのプロテクトで弾かれることもあるらしく、Google Playからではない登録をします。セキュリティのリスクを承知の上で自己責任でお願いします。Google Playに登録されていた古いバージョンを入れるので大丈夫だとは思われますが、使用しなくなった古いAndroidスマホに入れることで少しはマシかもしれません。私はそうしています。 [Intelligent Home Center apk](http://apk2.apkmonk.com/apk-21/cn.com.broadlink.econtrol.plus_2017-09-21.apk?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=IFVYHACUO60QSGWW9L9Z%2F20180505%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180505T123924Z&X-Amz-Expires=2400&X-Amz-SignedHeaders=host&X-Amz-Signature=c3990d59bae0310a6252574c37f8ac3be26f69d1913b553389de158bfb939996)

③ Intelligent Home Centerセットアップ まず、Androidスマホの言語設定を英語にします。こちらはお使いの端末によって少し違いますが、設定→言語でEnglishを選択するなどしていただければできるかと。 そして本体のResetボタンを細い何かで押してください。すると青ランプが点滅する同期モードになるはずです。これでスマホがWi-Fiに接続されていればアプリにRM mini3が認識されます。

④ Intelligent Home Center設定方法（リモコン編） ここからが大変地道な作業となります。ひたすら赤外線リモコンを一つづつポチポチしながら、それに名前をつけていきます。 「デバイス」を選択します。 ![](images/2018-05-05_22h42_57-1-175x300.png) 「RM mini3」を選択します。 ![](images/2018-05-05_22h44_36-176x300.png) 「アプリケーション追加」を押します。 ![](images/2018-05-05_22h48_24-175x300.png) ここでは例として「エアコン」を選択します。 ![](images/2018-05-05_22h52_02-175x300.png) 「ユーザ定義」で設定します。ちなみに、もし該当のメーカーがありそうであれば、二番目の「ブランドから選択」を選ぶと楽になります。 ![](images/2018-05-05_22h53_02-174x300.png) 「+」ボタンを押します。 ![](images/2018-05-05_22h55_10-173x300.png) すると、学習待機の状態になるので、RM mini3（黒色の本体）に向かって、エアコンのリモコンの任意のモードのボタンを一度押します。 ![](images/2018-05-05_22h59_06-264x300.png) エアコンの場合、今押されたボタンが、どのモードか（自動、冷房、暖房、送風、ドライ）、風強度が何か（自動、弱、中、強）、温度が何度かを選択します。 ![](images/2018-05-05_23h11_37-175x300.png) うまくRM mini3に認識されれば、テストモードになります。動作確認をするので、今回でしたら、一度エアコンを消してから「テスト」ボタンを押して本当にエアコンが点くかを確かめます。 ![](images/2018-05-05_23h07_53-300x180.png) うまくいったかを尋ねてくるので、良ければ「はい」を、駄目だったら「いいえ」で再学習です。 ![](images/2018-05-05_23h09_54-300x139.png) アプリ上のリモコンにボタンが定義されます。 ![](images/2018-05-05_22h55_10-2-173x300.png) 各リモコンによって画面は異なりますが、このようにRM mini3に向かって対象のボタンを押して覚えさせて、それに名前を付けるという作業を繰り返します。TVを学習させようとする場合は、チャンネル定義が必要なので、特に根気が要ります。

⑤ Intelligent Home Center設定方法（シーン編） 残念ながら、上記で終わりではありません。今までの設定で、IHCのアプリからは各家電を操作できますが、Google Homeを使った音声操作はできません。Google Homeに認識させるには、シーンというものを定義しなければなりません。Google HomeでRM mini3の機能を呼び出せるのは基本的にはシーンだけです。 まず、「シーン」に移動し、「+」ボタンを押します。 ![](images/2018-05-05_23h31_42-1-175x300.png) すると、以下のような画面になるので、「シーン名」と「対応するボタン」を選んでください。「シーン画像」は任意項目なので省いても大丈夫です。ここでは例として、照明をオンにするボタンを設定しました。 ![](images/2018-05-05_23h35_50-175x300.png) **※**この時、シーン名を工夫すると自然な応対ができます。Google Homeでの呼び出しは、「（シーン名）をつけて」で、その際のGoogle Homeの応答メッセージは「分かりました。（シーン名）にします」となります。呼び出しはショートカットという機能でどうとでもなるのですが、応答メッセージは変更できないので、上記メッセージが自然になるような「シーン名」にするとよいでしょう。例の通りだと、「電気をオンにします」で自然ですが、"電気を点ける"というシーン名にしてしまうと、「電気を点けるにします」という不自然な返しになってしまいます。

私自身のシーン設定は以下のようになっています。 ![](images/2018-05-05_23h48_15-173x300.png) 多いですね。。更に下にもまだまだあります。ここも面倒ですが一つづつ定義が必要です。あともう一息！

### Google Home & RM mini3

① Google Homeにアプリを紐付ける。 メニューを開き、 ![](images/2018-05-06_08h02_45-189x300.png) 「スマートホーム」を押します。 ![](images/2018-05-06_08h04_31-191x300.png) 「＋」ボタンを押します。 ![](images/2018-05-06_08h05_20-190x300.png) （こちらは既に設定済みの画面ですが、）「BroadLink Smart Home」を探して選択します。 ![](images/2018-05-06_08h08_24-189x300.png) うまくGoogle HomeとRM mini3の紐づけに成功すると、以下のように作成したシーン名が認識されて表示されるはずです。 ![](images/2018-05-06_08h10_18-189x300.png)

② ショートカットの設定 ここが最後の大変なポイントです。これまでの設定で、例えば上記設定で「OK Google、エアコンをオンをつけて」と話しかければ家電を音声で操作できるようになりました。ただ、日本語として変ですよね？これをGoogle Homeのショートカットという機能を使って呼び出し方を変えます。そしてこれも、シーン名に対して一つづつ設定しなければならないので、かなり骨の折れる作業です。 メニューを開きます。 ![](images/2018-05-06_08h02_45-189x300.png) 「その他の設定」→「ショートカット」を選択します。 ![](images/2018-05-06_08h20_12-189x300.png) ![](images/2018-05-06_08h19_20-190x300.png) 「＋」ボタンを押します。 ![](images/2018-05-06_08h23_57-190x300.png) 呼び出し時の（自然な）メッセージのパターンを上部にいくつか入力します。また、前述したRM mini3呼び出し方である、「（シーン名）をつけて」を下部に入力します。 ![](images/2018-05-06_08h27_18-190x300.png) ※ ここはコツが色々とあるので、以下を読みつつ、試しながら設定してください。 ・漢字とひらがな、カタカナを**区別**します。例えば上記だと、「でんきつけて」と入力してしまうと、恐らく反応しません。日本語版ならではの難しい所だと思います。 ・マイクでの入力をお勧めします。自分が発声したときに、どのように漢字変換されるかは分かりかねるので、言ってしまうのが手っ取り早いです。 ・入力パターンはいくつか設定したほうがいいです。これは使っていての経験則ですが、日常生活では呼び出し方の表現は結構揺れます。上の例のように"を"の有る無しなど。面倒ですが、ここで思いつく限り設定しておくと、今後の生活でのイライラが軽減されます。

これで設定は完了です！

### 終わりに

いかがでしたでしょうか？もの凄く大変だったかとは思いますが、これでスマートホームな快適生活が送れます。私は照明、TV、エアコンを設定しました。TVをつけたり、チャンネルを変えたりも音声操作できるので、リモコンを探すという不毛なこともしなくてよくなりました！総じて快適で、元の生活には戻れそうにありません。

### 参考にしたサイト

- [RM mini3が「正規品ではないため日本国内で利用できません」とエラーが出て使えないときの回避策](http://obakasanyo.net/rm-mini3-error-eremote-mini/)
- [RM mini 3とGoogle Homeで家電を操作してみよう](https://higehige4.blogspot.jp/2018/02/rm-mini-3google-home.html#site)

### 関連記事

http://localhost/life/review-google-home

http://localhost/life/tricks
